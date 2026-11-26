import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Gangi Jathin, AI Full-Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Link-preview card for LinkedIn, WhatsApp, X, etc.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 90px', background: 'radial-gradient(circle at 85% 20%, #134e4a 0%, #14171c 55%)', color: '#e5e7eb',
        }}
      >
        <div style={{ fontSize: 30, color: '#1fb2ac', marginBottom: 20 }}>Gangi Jathin</div>
        <div style={{ fontSize: 84, fontWeight: 800, color: 'white', lineHeight: 1.05 }}>AI Full-Stack</div>
        <div style={{ fontSize: 84, fontWeight: 800, color: '#1fb2ac', lineHeight: 1.05, marginBottom: 36 }}>Developer</div>
        <div style={{ fontSize: 30, color: '#9ca3af', maxWidth: 900 }}>
          React · FastAPI · PostgreSQL · RAG with citations · LangGraph agents · Explainable ML
        </div>
        <div style={{ display: 'flex', marginTop: 50, fontSize: 24, color: '#6b7280' }}>gangijathin.vercel.app</div>
      </div>
    ),
    size
  );
}
