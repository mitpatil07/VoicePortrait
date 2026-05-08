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
    <div className="video-result-container animate-fadeIn" style={{ maxWidth: '100%', margin: '0 auto' }}>
      <div className="card-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          background: '#f0fdf4', 
          color: '#16a34a',
          padding: '0.5rem 1rem',
          borderRadius: '100px',
          fontSize: '0.8rem',
          fontWeight: '700',
          marginBottom: '1rem',
          border: '1px solid #dcfce7'
        }}>
          ✨ Generation Complete
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>Your Portrait is Alive!</h2>
      </div>

      <div className="video-preview-card" style={{ 
        background: '#000', 
        borderRadius: '24px', 
        padding: '12px', 
        border: '1px solid var(--glass-border)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        maxWidth: '100%',
        margin: '0 auto'
      }}>
        <video 
          src={url} 
          controls 
          autoPlay 
          style={{ 
            width: '100%',
            height: 'auto',
            maxHeight: '500px',
            borderRadius: '16px',
            display: 'block',
            objectFit: 'contain'
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
