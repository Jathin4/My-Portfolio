import { Poppins } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://gangijathin.vercel.app'),
  title: 'Gangi Jathin - AI Full-Stack Developer Portfolio',
  description: 'Portfolio of Gangi Jathin, an AI full-stack developer building production web apps with React, FastAPI and PostgreSQL, and AI systems on top of them: RAG with citations, LangGraph agents and explainable ML.',
  keywords: 'AI, Full-Stack, React, FastAPI, PostgreSQL, RAG, LangGraph, AI Agents, Machine Learning, Python, Portfolio',
  authors: [{ name: 'Gangi Jathin' }],
  openGraph: {
    title: 'Gangi Jathin - AI Full-Stack Developer',
    description: 'Production web apps with React, FastAPI and PostgreSQL, and the AI systems on top of them.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gangi Jathin - AI Full-Stack Developer',
    description: 'Production web apps with React, FastAPI and PostgreSQL, and the AI systems on top of them.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <body className="antialiased bg-ink-950 text-white font-sans">{children}<Analytics /></body>
    </html>
  );
}
