# Gangi Jathin — Portfolio

Single-page Next.js 14 (App Router) + Tailwind CSS site.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

Requires Node 18+.

## Where things live

| What | Where |
|------|-------|
| All page content (hero, about, education, experience, skills, certifications, contact) | `src/components/portfolio.jsx` |
| SEO metadata, font (Poppins) | `src/app/layout.js` |
| Resume PDF linked from the hero | `public/files/Resume_Gangi_Jathin.pdf` |

## Projects section

Projects are fetched live from the GitHub API for `GITHUB_USERNAME` (top of `portfolio.jsx`).
Forks are hidden. To override a repo's description or tags, add an entry to `REPO_META`
keyed by the exact repo name; otherwise the GitHub description and language are used.
A repo's "Live Demo" link comes from its GitHub *Website* field.

The GitHub API allows 60 unauthenticated requests per hour per visitor IP.

## Contact form

Submits to [Web3Forms](https://web3forms.com). The access key in `handleSubmit` is a public
key by design; rotate it in the Web3Forms dashboard if needed.

## Deploy

See `DEPLOYMENT_GUIDE.md`. Vercel is the simplest: import the repo, no config needed.
