import React from 'react';

export default function GenerationProgress() {
  return (
    <div className="progress-container animate-fadeIn">
      <div className="spinner-wrapper" style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 2rem' }}>
        <div className="spinner-outer" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: '4px solid transparent',
          borderTopColor: 'var(--accent-primary)',
          borderBottomColor: 'var(--accent-secondary)',
          borderRadius: '50%',
          animation: 'spin 2s linear infinite'
        }}></div>
        <div className="spinner-inner" style={{
          position: 'absolute',
          top: '15px',
          left: '15px',
          width: '70px',
          height: '70px',
          border: '4px solid transparent',
          borderLeftColor: 'var(--accent-secondary)',
          borderRightColor: 'var(--accent-primary)',
          borderRadius: '50%',
          animation: 'spin 1.5s linear reverse infinite'
        }}></div>
      </div>
      
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Generating Magic...</h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '300px', margin: '0 auto', fontSize: '0.95rem', lineHeight: '1.6' }}>
        Our AI is carefully aligning the lips and rendering the cinematic frames. This usually takes 30-60 seconds.
      </p>

      <div style={{ 
        marginTop: '2rem', 
        width: '100%', 
        height: '6px', 
        background: 'rgba(255,255,255,0.05)', 
        borderRadius: '100px',
        overflow: 'hidden'
      }}>
        <div style={{ 
          height: '100%', 
          width: '60%', 
          background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
          borderRadius: '100px',
          animation: 'shimmer 2s infinite'
        }}></div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
