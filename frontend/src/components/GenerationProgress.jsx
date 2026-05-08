import { Loader2 } from 'lucide-react';

export default function GenerationProgress() {
  return (
    <div className="progress-container">
      <div className="breathing-circle"></div>
      <h2 className="progress-text">Generating AI Narration</h2>
      <p className="progress-subtext">
        Synthesizing speech, animating facial features, and adding cinematic touches.
        <br/>This may take a few minutes...
      </p>
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', color: 'var(--accent)' }}>
        <Loader2 className="animate-spin" size={32} style={{ animation: 'spin 2s linear infinite' }} />
      </div>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
