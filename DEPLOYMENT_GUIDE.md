# Deployment Guide

Complete guide to deploying your portfolio website to production.

## Pre-Deployment Checklist

Before deploying, ensure you've completed:

- [ ] Updated all personal information
- [ ] Added your projects
- [ ] Updated skills and experience
- [ ] Added your resume (if using PDF download)
- [ ] Tested contact form
- [ ] Verified all links work
- [ ] Tested on mobile devices
- [ ] Checked for console errors
- [ ] Updated SEO metadata in `layout.js`

---

## Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel:**
- Built by Next.js creators
- Zero configuration
- Automatic HTTPS
- Free tier available
- Global CDN
- Automatic previews for Git branches

**Steps:**

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub (recommended)

2. **Deploy from Git**
   ```bash
   # Push your code to GitHub first
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

3. **Import to Vercel**
   - Click "New Project" in Vercel dashboard
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

4. **Get Your URL**
   - Vercel provides: `your-project.vercel.app`
   - Free SSL certificate included

**Deploy Updates:**
```bash
git add .
git commit -m "Update portfolio"
git push
```
Vercel automatically redeploys on push!

---

### Option 2: Netlify

**Why Netlify:**
- Simple drag-and-drop deployment
- Excellent free tier
- Good for beginners
- Form handling included

**Steps:**

1. **Build Your Site**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - Drag `.next` folder to Netlify
   - Or connect GitHub repo

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

**Custom Domain:**
- Settings → Domain Management → Add custom domain

---

### Option 3: GitHub Pages (Static Export)

**Note:** Requires additional setup for Next.js static export.

1. **Update next.config.js**
   ```javascript
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   };
   ```

2. **Build Static Files**
   ```bash
   npm run build
   ```

3. **Deploy to GitHub Pages**
   ```bash
   # Install gh-pages
   npm install --save-dev gh-pages
   
   # Add to package.json scripts
   "deploy": "gh-pages -d out"
   
   # Deploy
   npm run deploy
   ```

4. **Enable GitHub Pages**
   - Repository Settings → Pages
   - Source: gh-pages branch
   - Save

**URL:** `https://yourusername.github.io/repository-name`

---

### Option 4: Self-Hosting (VPS/Cloud)

**For Advanced Users**

**Requirements:**
- VPS (DigitalOcean, AWS, etc.)
- Node.js installed
- PM2 or similar process manager

**Steps:**

1. **Build Production Version**
   ```bash
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm run start
   ```

3. **Use PM2 for Process Management**
   ```bash
   npm install -g pm2
   pm2 start npm --name "portfolio" -- start
   pm2 startup
   pm2 save
   ```

4. **Set Up Nginx Reverse Proxy**
   ```nginx
   server {
     listen 80;
     server_name yourdomain.com;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

5. **Enable SSL with Let's Encrypt**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

---

## Custom Domain Setup

### For Vercel

1. Purchase domain (Namecheap, Google Domains, etc.)
2. In Vercel Dashboard:
   - Project → Settings → Domains
   - Add your domain
3. Update DNS records at your registrar:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### For Netlify

1. Netlify Dashboard → Domain Settings
2. Add custom domain
3. Update DNS:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

---

## Environment Variables

If you add API integrations later:

**Vercel:**
1. Project Settings → Environment Variables
2. Add variables
3. Redeploy

**Example .env.local:**
```bash
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxx
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Access in code:**
```javascript
const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
```

---

## Performance Optimization

### Before Deployment

1. **Optimize Images**
   ```bash
   # Use WebP format
   # Compress images (use tinypng.com)
   # Recommended sizes:
   # - Hero images: 1920x1080
   # - Project images: 800x600
   # - Thumbnails: 400x300
   ```

2. **Enable Image Optimization**
   ```javascript
   // In next.config.js
   images: {
     formats: ['image/webp'],
   }
   ```

3. **Check Bundle Size**
   ```bash
   npm run build
   # Check the output for bundle sizes
   # Aim for <500KB for main bundle
   ```

### After Deployment

1. **Test Performance**
   - Use [PageSpeed Insights](https://pagespeed.web.dev/)
   - Aim for 90+ score
   - Fix any issues flagged

2. **Enable Caching**
   - Vercel/Netlify handle this automatically
   - For self-hosting, configure in Nginx

3. **Monitor**
   - Set up Vercel Analytics (free)
   - Or use Google Analytics

---

## SEO Setup

### 1. Update Metadata

**In layout.js:**
```javascript
export const metadata = {
  title: 'Your Name - AI/ML Developer | Portfolio',
  description: 'AI/ML developer specializing in...',
  keywords: 'AI, Machine Learning, Python, TensorFlow, Your Name',
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Your Name - AI/ML Developer',
    description: 'Your description...',
    url: 'https://yourwebsite.com',
    siteName: 'Your Name Portfolio',
    images: [
      {
        url: 'https://yourwebsite.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Name - AI/ML Developer',
    description: 'Your description...',
    images: ['https://yourwebsite.com/twitter-image.jpg'],
  },
};
```

### 2. Add Sitemap

Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourwebsite.com</loc>
    <lastmod>2026-02-06</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 3. Add robots.txt

Create `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://yourwebsite.com/sitemap.xml
```

### 4. Submit to Search Engines

- **Google:** [Google Search Console](https://search.google.com/search-console)
- **Bing:** [Bing Webmaster Tools](https://www.bing.com/webmasters)

---

## Analytics Setup

### Google Analytics 4

1. **Create GA4 Property**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create property
   - Get Measurement ID (G-XXXXXXXXXX)

2. **Add to Your Site**

Create `app/analytics.js`:
```javascript
'use client';

import Script from 'next/script';

export default function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </Script>
    </>
  );
}
```

3. **Add to layout.js**
```javascript
import Analytics from './analytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## Monitoring & Maintenance

### Regular Updates

**Monthly:**
- Update dependencies: `npm update`
- Check for security issues: `npm audit`
- Review analytics data
- Update projects section

**Quarterly:**
- Review and update resume
- Add new skills learned
- Update experience section
- Refresh project screenshots

### Backups

**Automatic (with Git):**
```bash
# Regular commits
git add .
git commit -m "Update: description"
git push
```

**Manual:**
- Export from Vercel/Netlify settings
- Keep local copy
- Consider using GitHub Releases for versions

---

## Troubleshooting Deployment Issues

### Build Fails

**Check:**
1. Run `npm run build` locally
2. Check Node version (must be 18+)
3. Review error messages
4. Verify all files are committed

**Common fixes:**
```bash
# Clear cache and rebuild
rm -rf .next
npm run build

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Images Not Loading

**Solutions:**
1. Check image paths (use `/` for public folder)
2. Verify images are in `public` folder
3. For Vercel: Images must be < 5MB

### Slow Performance

**Optimize:**
1. Compress images
2. Remove unused dependencies
3. Enable production mode
4. Check bundle size

### 404 Errors

**For static hosting:**
1. Ensure `next.config.js` has `output: 'export'`
2. Check `.next` folder exists after build
3. Verify paths don't use dynamic routes

---

## Post-Deployment Checklist

After deployment:

- [ ] Test all pages load correctly
- [ ] Verify all internal links work
- [ ] Check external links (LinkedIn, GitHub)
- [ ] Test on mobile devices
- [ ] Test contact form
- [ ] Verify resume download works
- [ ] Check loading speed
- [ ] Ensure SSL is active (https://)
- [ ] Test in different browsers
- [ ] Submit sitemap to search engines
- [ ] Set up analytics
- [ ] Share on LinkedIn/Twitter

---

## Going Live Announcement

### LinkedIn Post Template

```
🚀 Excited to share my new portfolio website!

After [X weeks/months] of development, I'm proud to present my professional portfolio showcasing my work in AI/ML and software development.

Check it out: [your-website.com]

Features:
✅ [Project count] AI/ML projects
✅ Interactive demonstrations
✅ Technical blog posts
✅ Contact form

I'd love to hear your feedback!

#WebDevelopment #AI #MachineLearning #Portfolio
```

### Twitter/X Post

```
Just launched my new portfolio! 🎉

Check out my AI/ML projects and get in touch:
[your-website.com]

Built with Next.js, Tailwind CSS, and lots of ☕

#buildinpublic #webdev
```

---

## Next Steps After Deployment

1. **Add Blog Section** (if desired)
2. **Implement Contact Form Backend**
3. **Add Testimonials**
4. **Create Case Studies**
5. **Add More Projects**
6. **Set Up Newsletter**

---

## Support Resources

- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **Netlify Support:** [netlify.com/support](https://netlify.com/support)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)

---

**Congratulations on deploying your portfolio! 🎉**

Remember to keep it updated and showcase your best work!
