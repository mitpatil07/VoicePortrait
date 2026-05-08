import React from 'react';
import { Download, RefreshCw, Share2 } from 'lucide-react';

export default function VideoResult({ url, onReset }) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'voice-portrait-generation.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="video-result-container animate-fadeIn">
      <div className="card-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          background: 'rgba(34, 197, 94, 0.1)', 
          color: '#4ade80',
          padding: '0.5rem 1rem',
          borderRadius: '100px',
          fontSize: '0.8rem',
          fontWeight: '600',
          marginBottom: '1rem'
        }}>
          ✨ Generation Complete
        </div>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Your Portrait is Alive!</h2>
      </div>

      <div className="video-preview-card" style={{ 
        background: '#000', 
        borderRadius: '20px', 
        padding: '8px', 
        border: '1px solid var(--glass-border)',
        boxShadow: '0 0 40px rgba(99, 102, 241, 0.2)'
      }}>
        <video 
          src={url} 
          controls 
          autoPlay 
          style={{ 
            borderRadius: '14px',
            display: 'block'
          }}
        />
      </div>

      <div className="video-actions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button onClick={handleDownload} className="btn-primary" style={{ flex: 2 }}>
          <Download size={20} />
          Download MP4
        </button>
        <button onClick={onReset} className="btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <RefreshCw size={18} />
          Try Another
        </button>
        <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50px' }}>
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
}
