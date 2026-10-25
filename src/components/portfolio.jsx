'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import {
  Github, Linkedin, Mail, ExternalLink, Download, ArrowDown, Send, Code2,
  Brain, Cpu, Database, Sparkles, Bot, Network, LineChart, Terminal, Lightbulb,
  Home, User, Briefcase, GraduationCap, Award, MessageSquare, ScanEye,
} from 'lucide-react';

// ── GitHub Config ─────────────────────────────────────────────────────────────
const GITHUB_USERNAME = 'Jathin4';

// Custom metadata per repo (key = exact GitHub repo name)
// ✅ Add a new entry here whenever you want a custom title/description/tags for a repo.
//    Optional `image: '/projects/name.png'` (file in public/projects) replaces the card's icon header.
const REPO_META = {
  'Agentic-AI': {
    title: 'Agentic RCM Copilot',
    description: 'Multi-agent AI for medical billing: a supervisor routes requests to a claims investigator (plan → tool calls → self-critique) or a data analyst, grounded by pgvector semantic search, with logging and an automated eval suite.',
    tags: ['Python', 'Agents', 'RAG', 'LLM'],
  },
  'Enterprise-knowledge-agent': {
    title: 'Enterprise Knowledge Agent',
    description: 'Production-grade multi-agent RAG system on Llama 3.2 (Ollama) and Qdrant, with FastAPI, PostgreSQL, Redis, MinIO, n8n automation and Prometheus + Grafana monitoring, all in a Docker-based architecture.',
    tags: ['Python', 'RAG', 'Agents', 'Qdrant'],
  },
  'customer-churn-prediction': {
    title: 'Customer Churn Prediction',
    description: 'End-to-end ML pipeline predicting telecom churn with 84.72% ROC-AUC (XGBoost), 20+ engineered features, K-Means customer segmentation and an interactive Streamlit dashboard.',
    tags: ['Python', 'ML', 'XGBoost'],
  },
  'AI-Enhanced-IT-Helpdesk-with-Semantic-Retrieval-and-Query-Refinement': {
    title: 'AI IT Helpdesk',
    description: 'AI-powered IT helpdesk system using semantic search and query refinement for intelligent customer support automation.',
    tags: ['Python', 'NLP', 'Semantic Search'],
  },
  'DocuSearch-AI-Semantic-PDF-Search-with-Visual-and-Tabular-Insights': {
    title: 'DocuSearch AI',
    description: 'Intelligent PDF search system with visual and tabular insights extraction using NLP and computer vision.',
    tags: ['Python', 'NLP', 'CV'],
  },
  'Hybrid-Chunking-and-Vector-Search-for-LLM-Based-Structured-Data-QA-Systems': {
    title: 'Hybrid Chunking for LLM QA',
    description: 'Hybrid chunking strategies and vector search optimization for LLM-based QA systems on structured data.',
    tags: ['Python', 'LLM', 'RAG'],
  },
  'Personalized-Quiz-Developer': {
    title: 'Personalized Quiz Generator',
    description: 'AI-powered quiz generation system creating personalized assessments based on user preferences and learning objectives.',
    tags: ['Python', 'NLP', 'AI'],
  },
  'Fitness-Tracker': {
    title: 'Fitness Tracker',
    description: 'Comprehensive fitness tracking application monitoring workouts, nutrition, and health metrics with analytics.',
    tags: ['Python', 'Analytics'],
  },
  'Diet-Recommendation-system': {
    title: 'Diet Recommendation System',
    description: 'ML-based diet recommendation system providing personalized nutrition plans based on health goals.',
    tags: ['Python', 'ML'],
  },
};

// Only these tags become filter pills (in this order, when at least one project has them)
const FILTER_TAGS = ['Agents', 'RAG', 'LLM', 'NLP', 'ML', 'CV'];

// Card header icon + label: first matching tag wins
const TAG_ICONS = [
  ['Agents', Network], ['RAG', Database], ['LLM', Bot], ['NLP', MessageSquare],
  ['CV', ScanEye], ['ML', Brain], ['Analytics', LineChart], ['AI', Sparkles],
];
function projectCategory(tags) {
  return TAG_ICONS.find(([t]) => tags.includes(t)) || [tags[0] || 'Project', Code2];
}

// Repos never shown in "My recent works" (exact GitHub repo names)
const HIDDEN_REPOS = [
  'GreeksforGreeks', 'Leetcode', 'DSA', 'scholas-monitoring-report-bot',
  'site-check', 'Jathin-Gangi', 'Articles', 'My-Portfolio',
];

// Helper: "my-repo-name" → "My Repo Name"
function formatRepoName(name) {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
// ── End GitHub Config ─────────────────────────────────────────────────────────

const NAV = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#about', label: 'About Me', icon: User },
  { href: '#experience', label: 'Experience', icon: Briefcase },
  { href: '#works', label: 'Works', icon: Code2 },
  { href: '#skills', label: 'Skills', icon: Award },
  { href: '#contact', label: 'Contact', icon: Mail },
];

const SOCIALS = [
  { href: 'https://github.com/Jathin4', label: 'GitHub', icon: Github },
  { href: 'https://www.linkedin.com/in/jathin-gangi-042a29225/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://leetcode.com/u/jathingangi/', label: 'LeetCode', icon: Terminal },
];

const STATS = [
  { value: '2', label: 'Internships' },
  { value: '95%', label: 'Vocalysis accuracy' },
  { value: '5,000+', label: 'Documents indexed' },
  { value: '13', label: 'Certifications' },
];

const EDUCATION = [
  {
    title: 'B.Tech in Computer Science & Engineering (AI & ML)',
    place: 'Vardhaman College of Engineering',
    period: '2021 – 2025',
    points: [
      'Specialized in Artificial Intelligence & Machine Learning',
      'Worked on GenAI, RAG systems, and ML-based applications',
      'Final Year Project: Thyroid Detection Framework Using Machine Learning',
    ],
  },
  {
    title: 'Intermediate (Class XII)',
    place: 'Sri Chaitanya Junior College',
    period: '2019 – 2021',
    points: [
      'Focused on Mathematics, Physics, and Chemistry (MPC)',
      'Built a strong analytical and problem-solving foundation',
    ],
  },
  { title: 'Secondary School (Class X)', place: 'Geetanjalli School', period: 'Completed in 2019' },
  { title: 'Primary Education (Classes I – V)', place: 'Kendriya Vidyalaya' },
];

const EXPERIENCE = [
  {
    role: 'AI Developer Intern',
    company: 'Cittaa Healthcare Services Pvt. Ltd.',
    period: '2025',
    points: [
      <>Designed and developed <strong>Vocalysis</strong>, an AI-based voice analysis model to evaluate a user's daily activities and emotional state using 45–60 seconds of voice input.</>,
      'Implemented speech processing and emotion analysis techniques to extract behavioral and sentiment features from user voice narratives.',
      <>Built a scoring mechanism that generates mental well-being insights, achieving approximately <strong>95% prediction accuracy</strong>.</>,
      'Optimized the end-to-end pipeline from audio ingestion to model inference, ensuring reliable and consistent performance.',
      'Contributed to real-world healthcare AI applications, focusing on user experience, model accuracy, and practical deployment considerations.',
    ],
  },
  {
    role: 'GenAI Intern',
    company: 'Wipro',
    period: '2024',
    points: [
      <>Developed LLM-based Retrieval-Augmented Generation (RAG) pipelines for document retrieval, improving query accuracy by <strong>30%</strong>.</>,
      'Implemented hybrid semantic chunking strategies to enhance contextual understanding and reduce response latency.',
      <>Built <strong>2 GenAI applications</strong> enabling fast and accurate knowledge search across <strong>5,000+ enterprise documents</strong>.</>,
      'Integrated vector databases and embeddings to optimize similarity search and retrieval performance.',
      'Presented AI solutions to cross-functional teams, contributing to increased internal adoption of GenAI tools.',
    ],
  },
];

const SKILLS = {
  'Programming Languages': ['Python', 'SQL', 'JavaScript', 'TypeScript'],
  'AI/ML & Data Science': ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV', 'NLP', 'Computer Vision', 'RAG Systems', 'LLMs (Llama, GPT)'],
  'Tools & Frameworks': ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter', 'MongoDB', 'Ollama', 'Qdrant', 'Docker', 'Git'],
};

const CERTIFICATIONS = [
  ['Oracle Cloud Infrastructure 2025 AI Foundations Associate', 'Oracle', 'November 2025'],
  ['Professional Development on GenAI', 'Vardhaman College of Engineering', 'September 2024'],
  ['Wipro Certified for Generative AI', 'Wipro', 'September 2024'],
  ['MongoDB and the Document Model', 'MongoDB', 'August 2024'],
  ['Data Privacy Fundamentals', 'Cognitive Class', 'August 2024'],
  ['Google Project Management Professional Certificate', 'Coursera', 'August 2024'],
  ['Google Play Academy', 'Google Play', 'July 2024'],
  ['Introduction to Prompt Engineering for Generative AI', 'LinkedIn Learning', 'June 2024'],
  ['How to Design and Deploy a Simple LAN and Wi-Fi Network', 'Internet Society Foundation', 'May 2024'],
  ['Business Analysis Basics', 'Simplilearn', 'May 2024'],
  ['Web Programming', 'Vardhaman College of Engineering', 'February 2024'],
  ['Advanced SQL', 'Kaggle', 'June 2023'],
  ['RPA Developer Foundation', 'UiPath', 'January 2023'],
];

// Faint scattered icons, like the hand-drawn doodles in the background of the design
const DOODLE_ICONS = [Brain, Cpu, Database, Sparkles, Bot, Network, LineChart, Terminal, Lightbulb, Code2];
const DOODLE_SPOTS = [
  [6, 12, -12], [18, 70, 8], [30, 30, 20], [44, 82, -6], [58, 18, 14],
  [70, 60, -18], [82, 28, 6], [92, 78, -10], [12, 45, 25], [64, 88, 10],
];

function Doodles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {DOODLE_SPOTS.map(([left, top, rotate], i) => {
        const Icon = DOODLE_ICONS[i % DOODLE_ICONS.length];
        return (
          <Icon
            key={i}
            size={36 + (i % 3) * 12}
            strokeWidth={1.2}
            className="absolute text-accent/10"
            style={{ left: `${left}%`, top: `${top}%`, transform: `rotate(${rotate}deg)` }}
          />
        );
      })}
    </div>
  );
}

// "About me" → white "About", teal "me"
function Heading({ white, teal, className = 'mb-12' }) {
  return (
    <h2 className={`text-3xl md:text-5xl font-bold ${className}`}>
      {white} <span className="text-accent">{teal}</span>
    </h2>
  );
}

function HeroIllustration() {
  return (
    <svg viewBox="0 0 420 340" className="w-full max-w-md animate-float" role="img" aria-label="Laptop running a neural network">
      <circle cx="210" cy="170" r="150" fill="#1fb2ac" opacity="0.08" />
      {/* network */}
      <g stroke="#1fb2ac" strokeWidth="1.5" opacity="0.6">
        {[[120, 60], [120, 110], [120, 160]].flatMap(([x1, y1]) =>
          [[210, 45], [210, 95], [210, 145]].map(([x2, y2]) => (
            <line key={`${x1}${y1}${x2}${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))
        )}
        {[[210, 45], [210, 95], [210, 145]].flatMap(([x1, y1]) =>
          [[300, 75], [300, 125]].map(([x2, y2]) => (
            <line key={`${x1}${y1}${x2}${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))
        )}
      </g>
      {[[120, 60], [120, 110], [120, 160], [210, 45], [210, 95], [210, 145], [300, 75], [300, 125]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="11" fill={i % 3 === 0 ? '#1fb2ac' : '#2a2f37'} stroke="#1fb2ac" strokeWidth="2.5" />
      ))}
      {/* laptop */}
      <rect x="105" y="190" width="210" height="120" rx="10" fill="#2a2f37" stroke="#e5e7eb" strokeWidth="3" />
      <rect x="120" y="204" width="180" height="92" rx="4" fill="#1a1d23" />
      <rect x="132" y="216" width="60" height="7" rx="3.5" fill="#1fb2ac" />
      <rect x="198" y="216" width="40" height="7" rx="3.5" fill="#e5e7eb" opacity="0.5" />
      <rect x="144" y="232" width="90" height="7" rx="3.5" fill="#e5e7eb" opacity="0.35" />
      <rect x="144" y="248" width="56" height="7" rx="3.5" fill="#1fb2ac" opacity="0.7" />
      <rect x="206" y="248" width="70" height="7" rx="3.5" fill="#e5e7eb" opacity="0.35" />
      <rect x="132" y="264" width="80" height="7" rx="3.5" fill="#e5e7eb" opacity="0.5" />
      <rect x="132" y="280" width="34" height="7" rx="3.5" fill="#1fb2ac" />
      <path d="M80 310 H340 L325 324 H95 Z" fill="#e5e7eb" />
      {/* chips */}
      {[['AI', 40, 120], ['RAG', 330, 190], ['ML', 335, 40]].map(([label, x, y]) => (
        <g key={label}>
          <rect x={x} y={y} width="54" height="26" rx="13" fill="#1fb2ac" />
          <text x={x + 27} y={y + 17.5} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1a1d23">{label}</text>
        </g>
      ))}
    </svg>
  );
}

// Three.js loads in its own chunk after the page is interactive
const NeuralSphere = dynamic(() => import('./NeuralSphere'), {
  ssr: false,
  loading: () => <div className="w-full aspect-square max-w-lg" />,
});

const TYPED_ROLES = ['RAG pipelines', 'GenAI applications', 'ML models', 'voice AI'];

// Types each role, pauses, deletes it, moves to the next
function Typewriter({ words }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setIndex((index + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
      deleting ? 40 : 80
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return (
    <span className="text-accent">
      {text}
      <span className="inline-block w-0.5 h-[1em] -mb-0.5 ml-0.5 bg-accent animate-pulse" />
    </span>
  );
}

// Fades and slides children in the first time they scroll into view
function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShown(true);
        io.disconnect();
      }
    }, { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition duration-700 ease-out ${shown ? 'opacity-100 translate-y-0' : 'motion-safe:opacity-0 motion-safe:translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

// Card that tilts toward the cursor in 3D; children with translateZ float above it
function TiltCard({ children, className = '' }) {
  const ref = useRef(null);

  const onMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-4px)`;
    ref.current.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`);
    ref.current.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`);
  };
  const onLeave = () => { ref.current.style.transform = ''; };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`[transform-style:preserve-3d] transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

// Branded header for a project card: grid + glow + floating 3D icon (or a screenshot if provided)
function ProjectHeader({ project }) {
  if (project.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={project.image} alt={`${project.title} preview`} loading="lazy" className="aspect-[16/9] w-full object-cover" />
    );
  }
  const [label, Icon] = projectCategory(project.tags);
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-ink-950 [transform-style:preserve-3d]">
      {/* faint grid */}
      <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(#1fb2ac_1px,transparent_1px),linear-gradient(90deg,#1fb2ac_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      {/* glow that follows the cursor (set by TiltCard) */}
      <div className="absolute inset-0 [background:radial-gradient(circle_at_var(--glow-x,50%)_var(--glow-y,40%),rgba(31,178,172,0.35),transparent_60%)]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 [transform:translateZ(40px)]">
        <div className="w-16 h-16 rounded-2xl bg-ink-800/80 border border-accent/40 shadow-[0_0_30px_rgba(31,178,172,0.35)] flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
          <Icon size={30} strokeWidth={1.6} />
        </div>
        <span className="text-[11px] uppercase tracking-[0.25em] text-accent/80">{label}</span>
      </div>
    </div>
  );
}

// Rotating 3D cube of core tech, pure CSS
const CUBE_FACES = ['Python', 'PyTorch', 'RAG', 'LLMs', 'SQL', 'Docker'];
const CUBE_TRANSFORMS = [
  'rotateY(0deg)', 'rotateY(90deg)', 'rotateY(180deg)',
  'rotateY(-90deg)', 'rotateX(90deg)', 'rotateX(-90deg)',
];
function TechCube({ size = 112 }) {
  return (
    <div className="[perspective:700px]" style={{ width: size, height: size }} aria-hidden="true">
      <div className="relative w-full h-full [transform-style:preserve-3d] motion-safe:animate-cube">
        {CUBE_FACES.map((face, i) => (
          <div
            key={face}
            className="absolute inset-0 flex items-center justify-center rounded-lg border border-accent/50 bg-ink-800/70 text-accent text-sm font-semibold shadow-[inset_0_0_25px_rgba(31,178,172,0.25)] backdrop-blur-sm"
            style={{ transform: `${CUBE_TRANSFORMS[i]} translateZ(${size / 2}px)` }}
          >
            {face}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic projects state
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(false);
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  // Fetch all public repos from GitHub on mount
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30&type=public`
        );
        if (!res.ok) throw new Error('GitHub API error');
        const repos = await res.json();

        const filtered = repos
          .filter(r => !r.fork && r.name !== GITHUB_USERNAME && !HIDDEN_REPOS.includes(r.name))
          // Described repos first, then most recently updated
          .sort((a, b) =>
            (!!(REPO_META[b.name] || b.description) - !!(REPO_META[a.name] || a.description)) ||
            new Date(b.updated_at) - new Date(a.updated_at))
          .map(r => {
            const meta = REPO_META[r.name] || {};
            return {
              name: r.name,
              title: meta.title || formatRepoName(r.name),
              image: meta.image || null,
              description: meta.description || r.description || 'No description provided.',
              tags: meta.tags || (r.language ? [r.language] : []),
              github: r.html_url,
              demo: r.homepage || null,
            };
          });

        setProjects(filtered);
      } catch (e) {
        console.error(e);
        setProjectsError(true);
      } finally {
        setProjectsLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filters = ['All', ...FILTER_TAGS.filter(t => projects.some(p => p.tags.includes(t)))];
  const matching = filter === 'All' ? projects : projects.filter(p => p.tags.includes(filter));
  const visibleProjects = showAll ? matching : matching.slice(0, 6);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'ddbd9e5d-9694-4261-b1e8-cefca3b41870',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Contact from ${formData.name}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = 'w-full px-4 py-3 rounded-md bg-ink-700/60 border border-white/5 text-sm text-white placeholder-gray-500 focus:border-accent focus:outline-none transition disabled:opacity-60';

  return (
    <div className="min-h-screen bg-ink-900 text-gray-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-ink-900/90 backdrop-blur-sm border-b border-white/5 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center gap-6">
            <a href="#home" className="text-lg font-bold text-white shrink-0">
              Gangi<span className="text-accent">Jathin</span>
            </a>
            <div className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar whitespace-nowrap text-sm min-w-0">
              {NAV.map(({ href, label }) => (
                <a key={href} href={href} className="text-gray-400 hover:text-accent transition">{label}</a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-12 overflow-hidden">
        <Doodles />
        <div className="relative max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <p className="text-accent font-medium mb-4">Hi, I'm Gangi Jathin</p>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] mb-6">
              <span className="text-white">AI & ML</span><br />
              <span className="text-accent">DEVELOPER</span>
            </h1>
            <p className="text-lg md:text-xl font-semibold text-white mb-6 h-8" aria-label={`I build ${TYPED_ROLES.join(', ')}`}>
              <span aria-hidden="true">I build <Typewriter words={TYPED_ROLES} /></span>
            </p>
            <p className="text-gray-400 mb-10 max-w-md leading-relaxed">
              Crafting intelligent solutions through machine learning and artificial intelligence.
              Transforming data into actionable insights.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="#contact" className="px-7 py-3 rounded-full bg-accent text-ink-950 text-sm font-semibold hover:bg-accent-dark transition">
                Hire me
              </a>
              <a
                href="/files/Resume_Gangi_Jathin.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 rounded-full bg-ink-800 border border-white/10 text-white text-sm font-semibold hover:border-accent transition inline-flex items-center gap-2"
              >
                Download CV
                <Download size={16} />
              </a>
            </div>
          </div>
          <div className="flex justify-center animate-fade-in">
            <NeuralSphere fallback={<HeroIllustration />} />
          </div>
        </div>
        <a
          href="#about"
          aria-label="Scroll to About"
          className="relative mx-auto mt-16 w-12 h-12 rounded-md bg-ink-800 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent transition"
        >
          <ArrowDown size={20} />
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 px-6 scroll-mt-16 overflow-hidden">
        <Doodles />
        <Reveal className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <Heading white="About" teal="me" />
            <div className="space-y-5 leading-relaxed text-gray-400">
              <p>
                I am a Computer Science Engineer specializing in Artificial Intelligence and Machine Learning, with strong academic and practical experience in building intelligent, data-driven systems. My work focuses on applying AI technologies to solve real-world problems efficiently and at scale.
              </p>
              <p>
                I have hands-on experience in Generative AI, Retrieval-Augmented Generation (RAG), machine learning, and data analytics, along with foundational knowledge in natural language processing, computer vision, and predictive modeling gained through academic and industry projects.
              </p>
              <p>
                I am committed to continuous learning and professional growth, and I actively explore emerging technologies to design solutions that are reliable, impactful, and aligned with real-world requirements.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {STATS.map(s => (
              <div key={s.label} className="rounded-xl bg-ink-800 border border-white/5 p-6">
                <p className="text-3xl md:text-4xl font-bold text-accent mb-2">{s.value}</p>
                <p className="text-sm text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Education */}
        <Reveal className="relative max-w-6xl mx-auto mt-24">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <GraduationCap className="text-accent" /> Education
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {EDUCATION.map((e, i) => (
              <div key={e.title} className={`rounded-xl bg-ink-800 border p-6 ${i === 0 ? 'border-accent/40 md:col-span-2' : 'border-white/5'}`}>
                <h4 className="text-lg font-semibold text-white mb-1">{e.title}</h4>
                <p className="text-accent text-sm mb-1">{e.place}</p>
                {e.period && <p className="text-xs text-gray-500">{e.period}</p>}
                {e.points && (
                  <ul className="mt-4 space-y-2 text-sm text-gray-400">
                    {e.points.map(p => (
                      <li key={p} className="flex gap-3"><span className="text-accent">•</span><span>{p}</span></li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 bg-ink-950/40 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <Heading white="Work" teal="experience" />
          <Reveal className="space-y-8">
            {EXPERIENCE.map(x => (
              <div key={x.role} className="rounded-xl bg-ink-800 border border-white/5 border-l-4 border-l-accent p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-5">
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white">{x.role}</h3>
                    <p className="text-accent">{x.company}</p>
                  </div>
                  <span className="self-start px-3 py-1 rounded-full bg-ink-700 text-xs text-gray-300">{x.period}</span>
                </div>
                <ul className="space-y-3 text-sm md:text-base text-gray-400 [&_strong]:text-white">
                  {x.points.map((p, i) => (
                    <li key={i} className="flex gap-3"><span className="text-accent">•</span><span>{p}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Works Section — Dynamic from GitHub */}
      <section id="works" className="relative py-24 px-6 scroll-mt-16 overflow-hidden">
        <Doodles />
        <div className="relative max-w-6xl mx-auto">
          <Heading white="My recent" teal="works" className="mb-6" />

          {!projectsLoading && !projectsError && projects.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => { setFilter(f); setShowAll(false); }}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
                    filter === f ? 'bg-accent text-ink-950' : 'bg-ink-800 text-gray-300 hover:text-accent'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}

          {/* Loading state */}
          {projectsLoading && (
            <div className="flex items-center justify-center py-20 text-gray-500">
              <svg className="animate-spin h-6 w-6 mr-3 text-accent" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span className="text-sm tracking-wide">Loading projects from GitHub...</span>
            </div>
          )}

          {/* Error state */}
          {projectsError && !projectsLoading && (
            <div className="text-center py-20 text-gray-500">
              <p className="mb-4">Could not load projects.</p>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:underline"
              >
                <Github size={20} />
                View all projects on GitHub
              </a>
            </div>
          )}

          {!projectsLoading && !projectsError && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProjects.map((project) => (
                <TiltCard key={project.name} className="group flex flex-col rounded-xl bg-ink-800 border border-white/5 overflow-hidden hover:border-accent/50 hover:shadow-[0_20px_50px_-20px_rgba(31,178,172,0.45)]">
                  <ProjectHeader project={project} />
                  <div className="flex flex-col flex-1 p-5 [transform:translateZ(20px)]">
                    <h3 className="text-base font-semibold text-white mb-2 break-words">{project.title}</h3>
                    <p className="text-sm text-gray-400 mb-4 leading-relaxed flex-1">{project.description}</p>
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-xs">{tag}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-sm">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-300 hover:text-accent transition">
                        <Github size={16} /> Code
                      </a>
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-300 hover:text-accent transition">
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          )}

          {!projectsLoading && !projectsError && matching.length > 6 && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-7 py-3 rounded-full bg-ink-800 border border-white/10 text-white text-sm font-semibold hover:border-accent transition"
              >
                {showAll ? 'Show less' : `View all ${matching.length} projects`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Skills & Certifications Section */}
      <section id="skills" className="py-24 px-6 bg-ink-950/40 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-8 mb-12">
            <Heading white="Skills &" teal="certifications" className="mb-0" />
            <div className="hidden sm:block shrink-0 mr-6">
              <TechCube />
            </div>
          </div>
          <Reveal className="grid md:grid-cols-3 gap-6 mb-20">
            {Object.entries(SKILLS).map(([group, items]) => (
              <div key={group} className="rounded-xl bg-ink-800 border border-white/5 p-6">
                <h3 className="text-white font-semibold mb-5 pb-3 border-b border-white/10">{group}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(s => (
                    <span key={s} className="px-3 py-1 rounded-full bg-ink-700 text-sm text-gray-300">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>

          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Award className="text-accent" /> Professional Certifications
          </h3>
          <Reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map(([title, issuer, date]) => (
              <div key={title} className="rounded-lg bg-ink-800 border border-white/5 border-l-2 border-l-accent p-5">
                <h4 className="text-sm font-semibold text-white mb-2">{title}</h4>
                <p className="text-xs text-accent mb-1">{issuer}</p>
                <p className="text-xs text-gray-500">{date}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 px-6 scroll-mt-16 overflow-hidden">
        <Doodles />
        <Reveal className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              Got a project in<br /><span className="text-accent">mind?</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-sm">
              I'm always interested in hearing about new opportunities, collaborations, or conversations about technology and AI.
            </p>
            <div className="space-y-3">
              {SOCIALS.map(({ href, label, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-accent transition">
                  <span className="w-9 h-9 rounded-full bg-ink-800 border border-white/10 flex items-center justify-center"><Icon size={16} /></span>
                  <span className="text-sm">{label === 'GitHub' ? 'github.com/Jathin4' : `${label} Profile`}</span>
                </a>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-medium text-white mb-2">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-medium text-white mb-2">Your Email</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-xs font-medium text-white mb-2">Your Message</label>
              <textarea
                id="contact-message"
                placeholder="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows="6"
                className={inputClass}
                required
                disabled={isSubmitting}
              ></textarea>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="p-4 rounded-md bg-accent/10 border border-accent/30 text-accent text-sm">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="p-4 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                Failed to send message. Please try again or email me directly.
              </div>
            )}

            <button
              type="submit"
              className="px-7 py-3 rounded-full bg-accent text-ink-950 text-sm font-semibold hover:bg-accent-dark transition inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <Send size={16} />
            </button>
          </form>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-ink-950/60">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {NAV.map(({ href, label, icon: Icon }) => (
              <a key={href} href={href} className="flex items-center gap-2 text-gray-400 hover:text-accent transition">
                <Icon size={14} /> {label}
              </a>
            ))}
          </div>
          <div className="flex gap-3">
            {SOCIALS.map(({ href, label, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-9 h-9 rounded-full bg-ink-800 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent transition">
                <Icon size={16} />
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Gangi Jathin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
