# AI/ML Developer Portfolio

A modern, professional portfolio website built with Next.js, Tailwind CSS, and Framer Motion. Features a clean black & white design with smooth animations and responsive layout.

## 🌟 Features

- **Modern Design**: Elegant editorial-style aesthetic with sophisticated typography
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Subtle scroll-triggered animations using Framer Motion
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Fast Performance**: Built with Next.js for optimal loading speeds
- **Easy Customization**: Well-structured code with clear comments

## 📋 Sections

1. **Home/Hero** - Name, title, tagline, and CTA buttons
2. **About** - Professional summary and background
3. **Skills** - Categorized technical expertise
4. **Projects** - Detailed project showcase with tech stacks
5. **Experience** - Professional work history
6. **Certifications** - Credentials and achievements
7. **Contact** - Contact form and social links

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization Guide

### 1. Personal Information

Edit the portfolio component (`portfolio.jsx`):

```javascript
// Update your name in the hero section
<h1>Your Name</h1>

// Update professional title
<p>Your Professional Title</p>

// Update tagline
<p>Your unique value proposition...</p>
```

### 2. Projects

Replace the projects array with your own projects:

```javascript
const projects = [
  {
    title: 'Your Project Name',
    description: 'Project description...',
    tech: ['Tech1', 'Tech2', 'Tech3'],
    problem: 'Problem solved and impact...',
    github: 'https://github.com/yourusername/repo',
    demo: 'https://your-demo-link.com'
  },
  // Add more projects...
];
```

### 3. Skills

Update the skills object with your technologies:

```javascript
const skills = {
  'Category Name': ['Skill1', 'Skill2', 'Skill3'],
  // Add more categories...
};
```

### 4. Experience

Modify the experiences array:

```javascript
const experiences = [
  {
    role: 'Your Role',
    company: 'Company Name',
    period: 'Start - End Date',
    responsibilities: [
      'Responsibility 1',
      'Responsibility 2',
    ]
  },
];
```

### 5. Certifications & Achievements

Update certifications and achievements:

```javascript
const certifications = [
  {
    title: 'Certification Name',
    issuer: 'Issuing Organization',
    date: 'Year'
  },
];

const achievements = [
  'Achievement 1',
  'Achievement 2',
];
```

### 6. Contact Information

Update contact details:

```javascript
// Email
<a href="mailto:your.email@example.com">

// Social links
<a href="https://linkedin.com/in/your-profile">
<a href="https://github.com/your-username">
```

### 7. Resume Download

To enable resume download:

1. Create a `public` folder in your project root
2. Add your resume PDF as `public/resume.pdf`
3. Update the resume button link:

```javascript
<a href="/resume.pdf" download>Download Resume</a>
```

### 8. Colors & Styling

The design uses a black & white palette. To customize:

**Change accent colors:**
```css
/* In globals.css */
.custom-accent {
  @apply text-blue-600; /* or any color */
}
```

**Modify fonts:**
Edit `layout.js` to use different Google Fonts:
```javascript
import { Your_Font } from 'next/font/google';
```

## 📁 Project Structure

```
├── portfolio.jsx          # Main portfolio component
├── page.js               # Next.js page wrapper
├── layout.js             # App layout with fonts & metadata
├── globals.css           # Global styles
├── tailwind.config.js    # Tailwind configuration
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies
└── README.md            # Documentation
```

## 🛠️ Technologies Used

- **Next.js 14** - React framework
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Google Fonts** - Typography (Playfair Display & Inter)

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ⚡ Performance Optimization

- Server-side rendering with Next.js
- Optimized font loading with `next/font`
- Lazy loading for animations
- Minimal JavaScript bundle size
- Optimized CSS with Tailwind

## 🎯 SEO Features

- Semantic HTML structure
- Meta tags for social sharing
- Descriptive alt texts (add to images)
- Proper heading hierarchy
- Fast page load times

## 📝 Adding New Sections

To add a new section:

1. Create the section component
2. Add navigation item to `navItems` array
3. Add section ID for smooth scrolling
4. Update Intersection Observer

Example:
```javascript
// Add to navItems
const navItems = [..., 'Blog'];

// Add section
<section id="blog" className="py-32 px-6">
  {/* Your content */}
</section>
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with one click

### Other Platforms

```bash
npm run build
npm run start
```

Deploy the `.next` folder and `public` directory to your hosting provider.

## 🐛 Troubleshooting

**Issue: Animations not working**
- Ensure Framer Motion is installed: `npm install framer-motion`

**Issue: Fonts not loading**
- Check internet connection for Google Fonts
- Verify font names in `layout.js`

**Issue: Tailwind styles not applying**
- Run `npm run dev` to restart the server
- Check `tailwind.config.js` content paths

## 📄 License

This portfolio template is free to use for personal and commercial projects.

## 🤝 Support

For issues or questions:
- Check the troubleshooting section
- Review Next.js documentation
- Check Tailwind CSS documentation

## ✨ Tips for Best Results

1. **Use high-quality project screenshots** - Add to `public/images/`
2. **Write compelling project descriptions** - Focus on impact and results
3. **Keep it updated** - Regularly add new projects and skills
4. **Optimize images** - Use WebP format for better performance
5. **Add analytics** - Track visitor engagement
6. **Test on multiple devices** - Ensure responsiveness
7. **Get feedback** - Share with peers before publishing

## 🎨 Customization Ideas

- Add a dark mode toggle
- Include a blog section
- Add project filtering by technology
- Implement search functionality
- Add testimonials section
- Include case studies
- Add a newsletter signup

---

**Built with ❤️ for AI/ML developers**

Happy coding! 🚀
