'use client';

import React, { useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, FileText } from 'lucide-react';

export default function Portfolio() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-serif font-bold">JG</span>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-600 hover:text-black transition">Home</a>
              <a href="#about" className="text-gray-600 hover:text-black transition">About</a>
              <a href="#education" className="text-gray-600 hover:text-black transition">Education</a>
              <a href="#experience" className="text-gray-600 hover:text-black transition">Experience</a>
              <a href="#projects" className="text-gray-600 hover:text-black transition">Projects</a>
              <a href="#skills" className="text-gray-600 hover:text-black transition">Skills & Certifications</a>
              <a href="#contact" className="text-gray-600 hover:text-black transition">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl text-center">
          <h1 className="text-7xl font-serif mb-6 animate-fade-in">
            Gangi Jathin
          </h1>
          <p className="text-2xl text-gray-600 mb-8 animate-slide-up">
            AI&ML Developer 
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Crafting intelligent solutions through machine learning and artificial intelligence. 
            Transforming data into actionable insights.
          </p>
          <div className="flex justify-center gap-4 animate-fade-in flex-wrap">
            <a
              href="#projects"
              className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition"
            >
              View Projects
            </a>
            <a
              href="/files/Resume_Gangi_Jathin.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-black hover:bg-gray-50 transition inline-flex items-center gap-2"
            >
              <FileText size={18} />
              Download Resume
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-black hover:bg-gray-50 transition"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-serif mb-12">About Me</h2>
          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
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
      </section>

      {/* Education Section */}
      <section id="education" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-serif mb-16">Education</h2>
          <div className="space-y-12">
            
            {/* B.Tech */}
            <div className="border-l-4 border-black pl-8">
              <div className="mb-4">
                <h3 className="text-3xl font-serif mb-2">B.Tech in Computer Science & Engineering (AI & ML)</h3>
                <p className="text-xl text-gray-600 mb-1">Vardhaman College of Engineering</p>
                <p className="text-gray-500">2021 – 2025</p>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-black mt-1">•</span>
                  <span>Specialized in Artificial Intelligence & Machine Learning</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black mt-1">•</span>
                  <span>Worked on GenAI, RAG systems, and ML-based applications</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black mt-1">•</span>
                  <span>Final Year Project: Thyroid Detection Framework Using Machine Learning</span>
                </li>
              </ul>
            </div>

            {/* Intermediate */}
            <div className="border-l-4 border-gray-300 pl-8">
              <div className="mb-4">
                <h3 className="text-2xl font-serif mb-2">Intermediate (Class XII)</h3>
                <p className="text-lg text-gray-600 mb-1">Sri Chaitanya Junior College</p>
                <p className="text-gray-500">2019 – 2021</p>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-black mt-1">•</span>
                  <span>Focused on Mathematics, Physics, and Chemistry (MPC)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black mt-1">•</span>
                  <span>Built a strong analytical and problem-solving foundation</span>
                </li>
              </ul>
            </div>

            {/* Secondary School */}
            <div className="border-l-4 border-gray-300 pl-8">
              <div className="mb-4">
                <h3 className="text-2xl font-serif mb-2">Secondary School (Class X)</h3>
                <p className="text-lg text-gray-600 mb-1">Geetanjalli School</p>
                <p className="text-gray-500">Completed in 2019</p>
              </div>
            </div>

            {/* Primary Education */}
            <div className="border-l-4 border-gray-300 pl-8">
              <div className="mb-4">
                <h3 className="text-2xl font-serif mb-2">Primary Education (Classes I – V)</h3>
                <p className="text-lg text-gray-600">Kendriya Vidyalaya</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-serif mb-16">Experience</h2>
          <div className="space-y-16">
            
            {/* Experience 1 */}
            <div className="border-l-4 border-black pl-8">
              <div className="mb-4">
                <h3 className="text-3xl font-serif mb-2">AI Developer Intern</h3>
                <p className="text-xl text-gray-600 mb-1">Cittaa Healthcare Services Pvt. Ltd.</p>
                <p className="text-gray-500">2025</p>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-black mt-2">•</span>
                  <span>Designed and developed <strong>Vocalysis</strong>, an AI-based voice analysis model to evaluate a user's daily activities and emotional state using 45–60 seconds of voice input.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black mt-2">•</span>
                  <span>Implemented speech processing and emotion analysis techniques to extract behavioral and sentiment features from user voice narratives.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black mt-2">•</span>
                  <span>Built a scoring mechanism that generates mental well-being insights, achieving approximately <strong>95% prediction accuracy</strong>.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black mt-2">•</span>
                  <span>Optimized the end-to-end pipeline from audio ingestion to model inference, ensuring reliable and consistent performance.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black mt-2">•</span>
                  <span>Contributed to real-world healthcare AI applications, focusing on user experience, model accuracy, and practical deployment considerations.</span>
                </li>
              </ul>
            </div>

            {/* Experience 2 */}
            <div className="border-l-4 border-black pl-8">
              <div className="mb-4">
                <h3 className="text-3xl font-serif mb-2">GenAI Intern</h3>
                <p className="text-xl text-gray-600 mb-1">Wipro</p>
                <p className="text-gray-500">2024</p>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-black mt-2">•</span>
                  <span>Developed LLM-based Retrieval-Augmented Generation (RAG) pipelines for document retrieval, improving query accuracy by <strong>30%</strong>.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black mt-2">•</span>
                  <span>Implemented hybrid semantic chunking strategies to enhance contextual understanding and reduce response latency.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black mt-2">•</span>
                  <span>Built <strong>2 GenAI applications</strong> enabling fast and accurate knowledge search across <strong>5,000+ enterprise documents</strong>.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black mt-2">•</span>
                  <span>Integrated vector databases and embeddings to optimize similarity search and retrieval performance.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black mt-2">•</span>
                  <span>Presented AI solutions to cross-functional teams, contributing to increased internal adoption of GenAI tools.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-serif mb-16">Projects</h2>
          <div className="space-y-16">
            
            {/* Project 1 */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <h3 className="text-3xl font-serif">Enterprise Knowledge Agent</h3>
                <a href="https://github.com/Jathin4/Enterprise-knowledge-agent" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-black transition">
                  <Github size={20} />
                  View Code
                </a>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                A production-ready multi-agent RAG system with specialized AI agents for retrieval and reasoning. Integrates Ollama (Llama 3.2) and Qdrant for semantic search with advanced intelligence services.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 text-sm">Python</span>
                <span className="px-3 py-1 bg-gray-100 text-sm">RAG</span>
                <span className="px-3 py-1 bg-gray-100 text-sm">Ollama</span>
                <span className="px-3 py-1 bg-gray-100 text-sm">Qdrant</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <h3 className="text-3xl font-serif">Customer Churn Prediction</h3>
                <a href="https://github.com/Jathin4/customer-churn-prediction" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-black transition">
                  <Github size={20} />
                  View Code
                </a>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                End-to-end machine learning project for predicting telecom customer churn using advanced classification algorithms and feature engineering.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 text-sm">Python</span>
                <span className="px-3 py-1 bg-gray-100 text-sm">ML</span>
                <span className="px-3 py-1 bg-gray-100 text-sm">Scikit-learn</span>
              </div>
            </div>

            {/* Project 3 */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <h3 className="text-3xl font-serif">AI-Enhanced IT Helpdesk</h3>
                <a href="https://github.com/Jathin4/AI-Enhanced-IT-Helpdesk-with-Semantic-Retrieval-and-Query-Refinement" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-black transition">
                  <Github size={20} />
                  View Code
                </a>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                AI-powered IT helpdesk system using semantic search and query refinement for intelligent customer support automation.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 text-sm">Python</span>
                <span className="px-3 py-1 bg-gray-100 text-sm">NLP</span>
                <span className="px-3 py-1 bg-gray-100 text-sm">Semantic Search</span>
              </div>
            </div>

            {/* Project 4 */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <h3 className="text-3xl font-serif">DocuSearch AI</h3>
                <a href="https://github.com/Jathin4/DocuSearch-AI-Semantic-PDF-Search-with-Visual-and-Tabular-Insights" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-black transition">
                  <Github size={20} />
                  View Code
                </a>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Intelligent PDF search system with visual and tabular insights extraction using NLP and computer vision.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 text-sm">Python</span>
                <span className="px-3 py-1 bg-gray-100 text-sm">NLP</span>
                <span className="px-3 py-1 bg-gray-100 text-sm">CV</span>
              </div>
            </div>

            {/* Project 5 */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <h3 className="text-3xl font-serif">Hybrid Chunking & Vector Search</h3>
                <a href="https://github.com/Jathin4/Hybrid-Chunking-and-Vector-Search-for-LLM-Based-Structured-Data-QA-Systems" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-black transition">
                  <Github size={20} />
                  View Code
                </a>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Hybrid chunking strategies and vector search optimization for LLM-based QA systems on structured data.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 text-sm">Python</span>
                <span className="px-3 py-1 bg-gray-100 text-sm">LLM</span>
                <span className="px-3 py-1 bg-gray-100 text-sm">RAG</span>
              </div>
            </div>

            {/* Project 6 */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <h3 className="text-3xl font-serif">Personalized Quiz Developer</h3>
                <a href="https://github.com/Jathin4/Personalized-Quiz-Developer" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-black transition">
                  <Github size={20} />
                  View Code
                </a>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                AI-powered quiz generation system creating personalized assessments based on user preferences and learning objectives.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 text-sm">Python</span>
                <span className="px-3 py-1 bg-gray-100 text-sm">NLP</span>
                <span className="px-3 py-1 bg-gray-100 text-sm">AI</span>
              </div>
            </div>

            {/* Project 7 */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <h3 className="text-3xl font-serif">Fitness Tracker</h3>
                <a href="https://github.com/Jathin4/Fitness-Tracker" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-black transition">
                  <Github size={20} />
                  View Code
                </a>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Comprehensive fitness tracking application monitoring workouts, nutrition, and health metrics with analytics.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 text-sm">Python</span>
                <span className="px-3 py-1 bg-gray-100 text-sm">Analytics</span>
              </div>
            </div>

            {/* Project 8 */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <h3 className="text-3xl font-serif">Diet Recommendation System</h3>
                <a href="https://github.com/Jathin4/Diet-Recommendation-system" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-black transition">
                  <Github size={20} />
                  View Code
                </a>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                ML-based diet recommendation system providing personalized nutrition plans based on health goals.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 text-sm">Python</span>
                <span className="px-3 py-1 bg-gray-100 text-sm">ML</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Skills & Certifications Combined Section */}
      <section id="skills" className="py-32 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-serif mb-16">Skills & Certifications</h2>
          
          {/* Skills Subsection */}
          <div className="mb-20">
            <h3 className="text-3xl font-serif mb-12">Technical Skills</h3>
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <h4 className="text-xl font-serif mb-6 pb-2 border-b border-gray-200">
                  Programming Languages
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li>Python</li>
                  <li>SQL</li>
                  <li>JavaScript</li>
                  <li>TypeScript</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-serif mb-6 pb-2 border-b border-gray-200">
                  AI/ML & Data Science
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li>TensorFlow</li>
                  <li>PyTorch</li>
                  <li>Scikit-learn</li>
                  <li>Keras</li>
                  <li>OpenCV</li>
                  <li>NLP</li>
                  <li>Computer Vision</li>
                  <li>RAG Systems</li>
                  <li>LLMs (Llama, GPT)</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-serif mb-6 pb-2 border-b border-gray-200">
                  Tools & Frameworks
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li>Pandas</li>
                  <li>NumPy</li>
                  <li>Matplotlib</li>
                  <li>Seaborn</li>
                  <li>Jupyter</li>
                  <li>MongoDB</li>
                  <li>Ollama</li>
                  <li>Qdrant</li>
                  <li>Docker</li>
                  <li>Git</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Certifications Subsection */}
          <div>
            <h3 className="text-3xl font-serif mb-12">Professional Certifications</h3>
            <div className="grid md:grid-cols-2 gap-8">
              
              <div className="border-l-2 border-gray-200 pl-6">
                <h4 className="text-lg font-serif mb-2">Oracle Cloud Infrastructure 2025 AI Foundations Associate</h4>
                <p className="text-gray-600 mb-1">Oracle</p>
                <p className="text-sm text-gray-500">November 2025</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6">
                <h4 className="text-lg font-serif mb-2">Professional Development on GenAI</h4>
                <p className="text-gray-600 mb-1">Vardhaman College of Engineering</p>
                <p className="text-sm text-gray-500">September 2024</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6">
                <h4 className="text-lg font-serif mb-2">Wipro Certified for Generative AI</h4>
                <p className="text-gray-600 mb-1">Wipro</p>
                <p className="text-sm text-gray-500">September 2024</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6">
                <h4 className="text-lg font-serif mb-2">MongoDB and the Document Model</h4>
                <p className="text-gray-600 mb-1">MongoDB</p>
                <p className="text-sm text-gray-500">August 2024</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6">
                <h4 className="text-lg font-serif mb-2">Data Privacy Fundamentals</h4>
                <p className="text-gray-600 mb-1">Cognitive Class</p>
                <p className="text-sm text-gray-500">August 2024</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6">
                <h4 className="text-lg font-serif mb-2">Google Project Management Professional Certificate</h4>
                <p className="text-gray-600 mb-1">Coursera</p>
                <p className="text-sm text-gray-500">August 2024</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6">
                <h4 className="text-lg font-serif mb-2">Google Play Academy</h4>
                <p className="text-gray-600 mb-1">Google Play</p>
                <p className="text-sm text-gray-500">July 2024</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6">
                <h4 className="text-lg font-serif mb-2">Introduction to Prompt Engineering for Generative AI</h4>
                <p className="text-gray-600 mb-1">LinkedIn Learning</p>
                <p className="text-sm text-gray-500">June 2024</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6">
                <h4 className="text-lg font-serif mb-2">How to Design and Deploy a Simple LAN and Wi-Fi Network</h4>
                <p className="text-gray-600 mb-1">Internet Society Foundation</p>
                <p className="text-sm text-gray-500">May 2024</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6">
                <h4 className="text-lg font-serif mb-2">Business Analysis Basics</h4>
                <p className="text-gray-600 mb-1">Simplilearn</p>
                <p className="text-sm text-gray-500">May 2024</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6">
                <h4 className="text-lg font-serif mb-2">Web Programming</h4>
                <p className="text-gray-600 mb-1">Vardhaman College of Engineering</p>
                <p className="text-sm text-gray-500">February 2024</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6">
                <h4 className="text-lg font-serif mb-2">Advanced SQL</h4>
                <p className="text-gray-600 mb-1">Kaggle</p>
                <p className="text-sm text-gray-500">June 2023</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6">
                <h4 className="text-lg font-serif mb-2">RPA Developer Foundation</h4>
                <p className="text-gray-600 mb-1">UiPath</p>
                <p className="text-sm text-gray-500">January 2023</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-serif mb-16">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-lg text-gray-600 mb-8">
                I'm always interested in hearing about new opportunities, collaborations, or conversations about technology and AI.
              </p>
              <div className="space-y-4">
                <a href="https://github.com/Jathin4" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-black transition">
                  <Github size={20} />
                  <span>github.com/Jathin4</span>
                </a>
                <a href="https://www.linkedin.com/in/jathin-gangi-042a29225/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-black transition">
                  <Linkedin size={20} />
                  <span>LinkedIn Profile</span>
                </a>
                <a href="https://leetcode.com/u/jathingangi/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-black transition">
                  <ExternalLink size={20} />
                  <span>LeetCode Profile</span>
                </a>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none" 
                  required 
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none" 
                  required 
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  value={formData.message} 
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                  rows="4" 
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none" 
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>
              
              {/* Status Messages */}
              {status === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded">
                  Failed to send message. Please try again or email me directly.
                </div>
              )}
              
              <button 
                type="submit" 
                className="w-full px-8 py-3 bg-black text-white hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p>© 2026 Gangi Jathin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}