# Detailed Customization Guide

This guide provides step-by-step instructions for customizing every aspect of your portfolio.

## Table of Contents

1. [Personal Information](#personal-information)
2. [Projects Section](#projects-section)
3. [Skills Section](#skills-section)
4. [Experience Section](#experience-section)
5. [Certifications](#certifications)
6. [About Section](#about-section)
7. [Contact Information](#contact-information)
8. [Resume Setup](#resume-setup)
9. [Styling & Colors](#styling--colors)
10. [Adding Images](#adding-images)

---

## Personal Information

### Location: `portfolio.jsx` - Hero Section

**1. Update Your Name**
```javascript
// Line ~185
<h1 className="text-6xl md:text-8xl font-light leading-[0.9] tracking-tight">
  Your First Name<br />Your Last Name
</h1>
```

**2. Update Professional Title**
```javascript
// Line ~175
<p className="font-sans text-sm uppercase tracking-[0.3em] text-black/40">
  Your Professional Title (e.g., Full Stack Developer, Data Scientist)
</p>
```

**3. Update Tagline**
```javascript
// Line ~193
<p className="text-xl md:text-2xl font-light text-black/60 max-w-2xl leading-relaxed">
  Your unique value proposition and what you do.
  Second line about your approach or expertise.
</p>
```

---

## Projects Section

### Location: `portfolio.jsx` - Line ~40

Replace the entire `projects` array with your own projects:

```javascript
const projects = [
  {
    title: 'Project Title',                    // Name of your project
    description: 'Brief description...',       // 2-3 sentences
    tech: ['React', 'Node.js', 'MongoDB'],    // Technologies used
    problem: 'Impact and results achieved',    // Quantify results if possible
    github: 'https://github.com/username/repo', // GitHub link
    demo: 'https://demo-link.com'              // Live demo (or null)
  },
  // Add 3-6 projects for best impact
];
```

**Tips:**
- Include 4-6 of your best projects
- Use specific metrics (e.g., "Reduced load time by 40%")
- Highlight technologies relevant to your target role
- Include both GitHub and live demo links when possible

---

## Skills Section

### Location: `portfolio.jsx` - Line ~25

Update the `skills` object with your technologies:

```javascript
const skills = {
  'Programming Languages': [
    'Python',
    'JavaScript',
    'TypeScript',
    // Add your languages
  ],
  'AI/ML & Deep Learning': [
    'TensorFlow',
    'PyTorch',
    // Add your ML tools
  ],
  // Add more categories relevant to your expertise
  'Your Custom Category': [
    'Tool 1',
    'Tool 2',
  ],
};
```

**Recommended Categories:**
- Programming Languages
- Frameworks & Libraries
- Databases
- Cloud & DevOps
- Tools & Software
- Methodologies

**Tips:**
- List 6-12 skills per category
- Order by proficiency (strongest first)
- Keep categories balanced (3-6 total)

---

## Experience Section

### Location: `portfolio.jsx` - Line ~61

Update the `experiences` array:

```javascript
const experiences = [
  {
    role: 'Senior Software Engineer',        // Your job title
    company: 'Tech Company Inc.',            // Company name
    period: 'Jan 2023 - Present',           // Duration
    responsibilities: [
      'Led a team of 5 developers...',       // Bullet point 1
      'Increased performance by 50%...',     // Bullet point 2
      'Implemented CI/CD pipeline...',       // Bullet point 3
      // Add 3-5 key responsibilities
    ]
  },
  // Add more positions (2-4 recommended)
];
```

**Tips:**
- Start each bullet with action verbs (Led, Developed, Implemented)
- Include quantifiable achievements
- Focus on impact, not just duties
- List most recent experience first

---

## Certifications

### Location: `portfolio.jsx` - Line ~77

Update certifications array:

```javascript
const certifications = [
  {
    title: 'AWS Certified Developer',        // Certification name
    issuer: 'Amazon Web Services',           // Issuing organization
    date: '2024'                             // Year obtained
  },
  // Add 3-6 most relevant certifications
];
```

### Location: `portfolio.jsx` - Line ~89

Update achievements array:

```javascript
const achievements = [
  'First place - National Hackathon 2024',
  'Published author - Tech Journal',
  'Speaker at Developer Conference',
  // Add 3-5 notable achievements
];
```

---

## About Section

### Location: `portfolio.jsx` - About Section (~Line 250)

Update the three paragraphs in the About section:

```javascript
<p>
  First paragraph: Introduce yourself and your specialty.
  Mention years of experience and primary focus areas.
</p>
<p>
  Second paragraph: Describe your experience and expertise.
  Highlight key domains you've worked in.
</p>
<p>
  Third paragraph: Share your current focus and goals.
  Mention learning interests and contributions.
</p>
```

**Structure Tips:**
- Paragraph 1: Who you are + what you do
- Paragraph 2: Your experience + technical strengths
- Paragraph 3: Current focus + future goals

---

## Contact Information

### 1. Update Email

**Location:** Contact Section (~Line 680)

```javascript
<a href="mailto:your.email@example.com">
  your.email@example.com
</a>
```

### 2. Update Social Links

**LinkedIn:**
```javascript
<a
  href="https://www.linkedin.com/in/your-profile/"
  target="_blank"
  rel="noopener noreferrer"
>
  LinkedIn →
</a>
```

**GitHub:**
```javascript
<a
  href="https://github.com/your-username"
  target="_blank"
  rel="noopener noreferrer"
>
  GitHub →
</a>
```

### 3. Contact Form

The form is pre-configured with a demo handler. To connect to a real backend:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setFormStatus('sending');
  
  try {
    // Replace with your API endpoint
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }
  } catch (error) {
    setFormStatus('error');
  }
};
```

---

## Resume Setup

### Option 1: Direct PDF Download

1. Create a `public` folder in your project root
2. Add your resume: `public/resume.pdf`
3. Update the button:

```javascript
<a
  href="/resume.pdf"
  download="YourName_Resume.pdf"
  className="px-8 py-4 border border-black..."
>
  Download Resume
</a>
```

### Option 2: External Link (Google Drive, Dropbox)

```javascript
<a
  href="https://drive.google.com/your-resume-link"
  target="_blank"
  rel="noopener noreferrer"
  className="px-8 py-4 border border-black..."
>
  View Resume
</a>
```

---

## Styling & Colors

### Change Color Scheme

**Location:** Various components

**Primary Accent Color:**
```javascript
// Replace black with your color
className="bg-black text-white"
// Change to:
className="bg-blue-600 text-white"
```

**Border Colors:**
```javascript
// Replace black borders
className="border-black"
// Change to:
className="border-blue-600"
```

### Font Customization

**Location:** `layout.js`

```javascript
import { Montserrat, Lora } from 'next/font/google';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-sans',
});

const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-serif',
});
```

**Popular Font Combinations:**
- Montserrat + Merriweather
- Raleway + Lora
- Poppins + Source Serif Pro
- Work Sans + Crimson Text

---

## Adding Images

### Project Images

1. Create images folder: `public/projects/`
2. Add project images
3. Update project cards:

```javascript
<div className="mb-6 overflow-hidden">
  <img
    src="/projects/project-name.jpg"
    alt="Project Name"
    className="w-full h-48 object-cover hover:scale-105 transition-transform"
  />
</div>
```

### Profile Photo

Add to About section:

```javascript
<div className="grid md:grid-cols-2 gap-16">
  <div>
    <img
      src="/profile.jpg"
      alt="Your Name"
      className="w-full h-auto"
    />
  </div>
  <div>
    {/* About content */}
  </div>
</div>
```

---

## Advanced Customization

### Add Dark Mode

1. Install theme package:
```bash
npm install next-themes
```

2. Add theme provider in `layout.js`

3. Add toggle button in navigation

### Add Animation Customization

**Location:** `portfolio.jsx` - Animation variants

```javascript
const fadeInUp = {
  initial: { opacity: 0, y: 40 },     // Starting state
  animate: { opacity: 1, y: 0 },      // End state
  transition: { duration: 0.6 }       // Animation duration
};
```

**Customize timing:**
- `duration`: 0.3 (fast), 0.6 (medium), 1.0 (slow)
- `delay`: Stagger animations (0.1, 0.2, etc.)

---

## Content Writing Tips

### Projects
- Start with action verb (Built, Developed, Created)
- Include specific technologies
- Quantify results (%, time saved, users impacted)

### Experience
- Use STAR method (Situation, Task, Action, Result)
- Focus on achievements, not just responsibilities
- Include metrics and impact

### About Section
- Keep it concise (3 paragraphs max)
- Show personality while staying professional
- Highlight what makes you unique

---

## Final Checklist

Before publishing:

- [ ] All personal information updated
- [ ] 4-6 projects with descriptions
- [ ] Skills list is current
- [ ] Experience includes metrics
- [ ] Contact form tested
- [ ] Resume link works
- [ ] All social links correct
- [ ] Mobile responsiveness checked
- [ ] Tested in multiple browsers
- [ ] Grammar and spelling checked
- [ ] Images optimized (if added)
- [ ] SEO metadata updated in `layout.js`

---

## Need Help?

Refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)

---

**Pro Tip:** Make small changes incrementally and test in the browser (npm run dev) to see results immediately. This helps catch errors early!
