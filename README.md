# Agentic RCM Copilot

A multi-agent AI system for medical billing (Revenue Cycle Management) that
investigates claim denials in depth and answers broad analytical questions
across many claims — built entirely free, running 100% locally via Ollama.

## What it does

Ask it things like:
```
"Investigate claim CLM-1001"
"How many claims were denied?"
"Which payer denies the most claims?"
"What is the total billed amount for denied claims?"
```

A supervisor automatically figures out which specialist should handle the
request, then routes it there.

## Why this is "agentic" AI, not just "an LLM wrapper"

It doesn't just answer a question in one shot. It:
- **Takes real actions** — queries a real database, does semantic search, and decides which tool to call next based on what it just learned
- **Plans ahead** — writes an upfront investigation plan before executing it
- **Reviews its own work** — a separate critic call checks the draft answer against the actual data gathered, and can trigger a revision
- **Coordinates multiple specialized agents** — a supervisor routes between a deep-investigation worker and a broad-analytics worker
- **Is measurable** — every request is logged, and an automated test suite catches regressions

## Architecture

```
User request
    |
    v
SUPERVISOR  (app/supervisor.py) — classifies the request, no tools of its own
    |
    +--> CLAIMS INVESTIGATOR (single claim, deep dive)
    |         |
    |         v
    |     PLANNER (app/planner.py) — writes an upfront plan
    |         |
    |         v
    |     EXECUTOR (app/agent.py, on app/engine.py's shared ReAct loop)
    |         |    tools: get_claim_details, get_payer_policy,
    |         |           get_diagnosis_description, get_similar_past_claims
    |         v
    |     CRITIC (app/critic.py) — reviews the draft against real tool results
    |         |
    |         +--> approved --> done
    |         +--> not approved --> REVISE --> done
    |
    +--> DATA ANALYST (app/data_analyst.py, same shared engine, different tools)
              tools: count_claims_by_status, count_denials_by_reason,
                     count_denials_by_payer, total_billed_amount,
                     list_claims_by_payer
    |
    v
Logged automatically (app/observability.py) --> Postgres
    |
    v
Answer returned to user
```

Both workers are built from the **same shared engine** (`app/engine.py`) —
just configured with different tools and system prompts. That's the real
lesson of the multi-agent layer: it's the same loop, reused, coordinated
by one routing layer on top — not separate magic per agent.

## The data layer (where RAG lives)

```
Claim / denial / diagnosis data  -->  Postgres (Neon, free tier)
Past claim resolution text       -->  embedded locally (Ollama: nomic-embed-text)
                                  -->  stored as vectors (pgvector)

At query time:
New claim's situation (plain text)  -->  embedded the same way
                                     -->  compared via cosine similarity (<=>)
                                     -->  top-K similar past claims retrieved
                                     -->  fed back to the LLM as grounding
```

This is the actual RAG (Retrieval-Augmented Generation) pipeline in the
project — `get_similar_past_claims()` in `app/db_data.py`.

## Tech stack (100% free)

| Piece | Technology |
|---|---|
| LLM | Ollama, running `qwen2.5` locally |
| Embeddings | Ollama, running `nomic-embed-text` locally |
| Database | Neon (free-tier Postgres) |
| Vector search | pgvector extension |
| API layer | FastAPI |

## Project layout

```
app/
  engine.py           Shared ReAct agent loop (tool-calling, used by both workers)
  agent.py            Claims Investigator worker config (tools + system prompt)
  data_analyst.py      Data Analyst worker config (tools + system prompt)
  planner.py           Upfront plan generation
  critic.py             Self-critique + revision
  orchestrator.py      Wires planner -> executor -> critic together
  supervisor.py        Routes requests to the right worker
  db_data.py            Real Postgres queries for single-claim lookups + semantic search
  analytics_data.py    Real Postgres aggregate queries for broad questions
  observability.py     Auto-logs every request to Postgres
  main.py               FastAPI app

db/
  schema.sql            Full database schema (claims, policies, embeddings, logs)
  seed.py                 Loads sample data + generates embeddings
  test_connection.py    Sanity-checks the DB connection
  view_logs.py           Inspect recent logged requests

evals/
  test_cases.py          5 automated test cases with pass/fail checks
  run_evals.py            Runs the test suite against the real pipeline

cli.py                  Command-line entry point
docs/
  mock_data_original_prototype.py   The original fake-data version this
                                     project started from, kept for reference
```

## Setup

```bash
# 1. Install Ollama and pull the two models used
ollama pull qwen2.5
ollama pull nomic-embed-text

# 2. Set up your free Neon Postgres project, then:
cp .env.example .env
# paste your real DATABASE_URL into .env

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set up the database (creates tables, loads sample data, generates embeddings)
python db/seed.py
python db/test_connection.py   # sanity check

# 5. Run it
python cli.py "Investigate claim CLM-1001"
python cli.py "How many claims were denied?"

# 6. Run the automated test suite
python evals/run_evals.py

# 7. Inspect what the system has done
python db/view_logs.py
```

## How this was built

This started as a single hand-rolled tool-calling loop with fake mock
data, then was built up in stages — each one solving a specific gap
found by actually testing the previous stage (including real bugs like
the agent hallucinating wrong diagnosis meanings, and later a critic
that itself gave false alarms):

1. Hand-rolled ReAct agent loop (no framework) with fake data
2. Real Postgres + pgvector semantic memory (RAG)
3. Planning + self-critique
4. Multi-agent orchestration (supervisor + specialist workers)
5. Evaluation + observability (automated regression tests + logging)

Every piece above was debugged against real, observed failures — not just
built and assumed to work — which is why the eval suite's checks directly
encode the specific hallucinations found during development as permanent
regression guards.
