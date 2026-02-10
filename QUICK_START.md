# Quick Start Guide

Get your portfolio running in 5 minutes!

## Prerequisites

- Node.js 18+ installed ([Download here](https://nodejs.org/))
- A code editor (VS Code recommended)
- Terminal/Command Prompt

## Setup Steps

### 1. Organize Your Files

Create a new folder for your portfolio and copy all these files into it:

```
my-portfolio/
├── portfolio.jsx
├── page.js
├── layout.js
├── globals.css
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── package.json
└── .gitignore
```

### 2. Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

This will install:
- Next.js
- React
- Tailwind CSS
- Framer Motion
- All other dependencies

**Wait time:** 1-2 minutes

### 3. Start Development Server

```bash
npm run dev
```

### 4. View Your Portfolio

Open your browser and go to:
```
http://localhost:3000
```

You should see your portfolio running! 🎉

---

## Immediate Customizations

### Update These First (Top Priority)

**1. Your Name** - `portfolio.jsx` line ~185
```javascript
<h1>Your Name</h1>
```

**2. Professional Title** - `portfolio.jsx` line ~175
```javascript
<p>Your Professional Title</p>
```

**3. Contact Email** - `portfolio.jsx` line ~680
```javascript
<a href="mailto:your.email@example.com">
```

**4. Social Links** - `portfolio.jsx` Contact Section
- Update LinkedIn URL
- Update GitHub URL

**5. Meta Tags** - `layout.js`
```javascript
export const metadata = {
  title: 'Your Name - Your Title',
  description: 'Your description...',
};
```

---

## File Structure Explained

### Core Files (Do Not Delete)

- **portfolio.jsx** - Main portfolio component (your content goes here)
- **page.js** - Next.js page wrapper
- **layout.js** - App layout, fonts, and SEO metadata
- **globals.css** - Global styles and Tailwind imports
- **package.json** - Project dependencies

### Configuration Files

- **tailwind.config.js** - Tailwind CSS settings
- **postcss.config.js** - CSS processing
- **next.config.js** - Next.js configuration
- **.gitignore** - Files to exclude from Git

---

## Common Issues & Solutions

### Issue 1: "npm not found"
**Solution:** Install Node.js from [nodejs.org](https://nodejs.org/)

### Issue 2: Port 3000 already in use
**Solution:** 
```bash
# Kill the process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill

# Or use a different port
npm run dev -- -p 3001
```

### Issue 3: Styles not loading
**Solution:** 
1. Stop the server (Ctrl+C)
2. Delete `.next` folder
3. Run `npm run dev` again

### Issue 4: Module not found errors
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

---

## Next Steps

### Customize Your Content

1. **Add Your Projects** (10 min)
   - Open `portfolio.jsx`
   - Find the `projects` array (line ~40)
   - Replace with your projects

2. **Update Your Skills** (5 min)
   - Find the `skills` object (line ~25)
   - Add your technologies

3. **Add Your Experience** (10 min)
   - Find the `experiences` array (line ~61)
   - Add your work history

4. **Update About Section** (5 min)
   - Find the About section (line ~250)
   - Write your bio

### Add Your Resume

1. Create a `public` folder in your project root
2. Add your resume PDF: `public/resume.pdf`
3. The download button will automatically work

---

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Check for errors
npm run lint
```

---

## Deployment (When Ready)

### Deploy to Vercel (Recommended - Free)

1. Create account at [vercel.com](https://vercel.com)
2. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
3. Deploy:
   ```bash
   vercel
   ```
4. Follow the prompts
5. Get your live URL!

**Deployment time:** 2-3 minutes

### Alternative: Netlify

1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

---

## Testing Checklist

Before deployment, test:

- [ ] All sections display correctly
- [ ] Navigation works (click all menu items)
- [ ] Contact form shows success message
- [ ] All links open correctly
- [ ] Mobile view looks good (resize browser)
- [ ] No console errors (press F12, check Console tab)

---

## Getting Help

### Documentation
- **This Project:** See CUSTOMIZATION_GUIDE.md for detailed instructions
- **Next.js:** [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind:** [tailwindcss.com/docs](https://tailwindcss.com/docs)

### Common Questions

**Q: How do I change colors?**
A: Search for `bg-black` and `text-black` in portfolio.jsx and replace with your colors (e.g., `bg-blue-600`)

**Q: How do I add more sections?**
A: See CUSTOMIZATION_GUIDE.md > "Adding New Sections"

**Q: Can I use my own domain?**
A: Yes! After deploying to Vercel/Netlify, you can add a custom domain in their dashboard.

---

## Pro Tips

1. **Save Often:** Changes appear automatically in dev mode
2. **Use Search:** Press Ctrl+F to find text in files quickly
3. **Start Small:** Customize one section at a time
4. **Test Mobile:** Use browser's device toolbar (F12 > Toggle Device Toolbar)
5. **Keep Backup:** Make a copy before major changes

---

## Timeline for Customization

**Minimal (30 minutes):**
- Update personal info
- Add 2-3 projects
- Update contact details

**Standard (2 hours):**
- All personal info
- 4-6 projects with details
- Full experience section
- About section
- Skills updated

**Complete (4 hours):**
- Everything customized
- Resume added
- Images added
- Testing complete
- Ready to deploy

---

## You're All Set! 🚀

Your portfolio is now running. Take it step by step:
1. Get it running ✅
2. Update basic info (today)
3. Add projects (this week)
4. Polish and deploy (this month)

**Remember:** A simple, working portfolio is better than a perfect one that's not live. Start basic and improve over time!

---

**Questions?** Check CUSTOMIZATION_GUIDE.md or README.md for detailed help.

Happy building! 💻✨
