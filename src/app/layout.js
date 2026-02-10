import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

/**
 * Font Configuration
 * - Playfair Display: Elegant serif font for headings and main text
 * - Inter: Clean sans-serif for UI elements and labels
 */
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

/**
 * Metadata for SEO optimization
 */
export const metadata = {
  title: 'Jathin Gangi - AI/ML Developer Portfolio',
  description: 'Professional portfolio of Jathin Gangi, an AI/ML developer specializing in machine learning, deep learning, and data science. Explore projects, skills, and experience.',
  keywords: 'AI, Machine Learning, Deep Learning, Data Science, Python, TensorFlow, PyTorch, Portfolio',
  authors: [{ name: 'Jathin Gangi' }],
  openGraph: {
    title: 'Jathin Gangi - AI/ML Developer',
    description: 'Crafting intelligent solutions through machine learning and artificial intelligence',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jathin Gangi - AI/ML Developer',
    description: 'Crafting intelligent solutions through machine learning and artificial intelligence',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
