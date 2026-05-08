import React from 'react';
import { XCircle } from 'lucide-react';

export default function GenerationProgress({ onCancel }) {
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
      
      <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>Generating Magic...</h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '300px', margin: '0 auto', fontSize: '0.95rem', lineHeight: '1.6' }}>
        Our AI is carefully aligning the lips. This usually takes 30-60 seconds.
      </p>

      <div style={{ 
        marginTop: '2rem', 
        width: '100%', 
        height: '6px', 
        background: 'rgba(0,0,0,0.05)', 
        borderRadius: '100px',
        overflow: 'hidden',
        marginBottom: '2.5rem'
      }}>
        <div style={{ 
          height: '100%', 
          width: '60%', 
          background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
          borderRadius: '100px',
          animation: 'shimmer 2s infinite'
        }}></div>
      </div>

      <button 
        onClick={onCancel}
        style={{ 
          background: '#fef2f2', 
          color: '#ef4444', 
          border: '1px solid #fee2e2',
          padding: '0.8rem 2rem',
          borderRadius: '12px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          margin: '0 auto',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = '#fee2e2'}
        onMouseOut={(e) => e.currentTarget.style.background = '#fef2f2'}
      >
        <XCircle size={18} />
        Stop Generation
      </button>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
