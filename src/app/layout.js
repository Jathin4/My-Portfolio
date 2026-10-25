import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Gangi Jathin - AI/ML Developer Portfolio',
  description: 'Professional portfolio of Gangi Jathin, an AI/ML developer specializing in machine learning, deep learning, and data science. Explore projects, skills, and experience.',
  keywords: 'AI, Machine Learning, Deep Learning, Data Science, Python, TensorFlow, PyTorch, Portfolio',
  authors: [{ name: 'Gangi Jathin' }],
  openGraph: {
    title: 'Gangi Jathin - AI/ML Developer',
    description: 'Crafting intelligent solutions through machine learning and artificial intelligence',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gangi Jathin - AI/ML Developer',
    description: 'Crafting intelligent solutions through machine learning and artificial intelligence',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <body className="antialiased bg-ink-950 text-white font-sans">{children}</body>
    </html>
  );
}
