import React, { useState } from 'react';
import NarratorForm from './components/NarratorForm';
import GenerationProgress from './components/GenerationProgress';
import VideoResult from './components/VideoResult';
import axios from 'axios';
import { Sparkles } from 'lucide-react';

function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async (formData) => {
    setIsGenerating(true);
    setVideoUrl(null);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/videos/generate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setVideoUrl(response.data.videoUrl);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Something went wrong during generation.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <div className="logo-container">
          <h1 className="logo-text">VoicePortrait</h1>
          <p className="subtitle">AI Cinematic Narrator Engine</p>
        </div>
      </header>

      <main className="main-content">
        <div className="glass-card">
          {!isGenerating && !videoUrl && (
            <div className="card-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Animate Your Portrait</h2>
              <p style={{ color: 'var(--text-muted)' }}>Upload an image and audio to begin the magic.</p>
            </div>
          )}

          {isGenerating ? (
            <GenerationProgress />
          ) : videoUrl ? (
            <VideoResult url={videoUrl} onReset={() => setVideoUrl(null)} />
          ) : (
            <NarratorForm onGenerate={handleGenerate} />
          )}

          {error && (
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              borderRadius: '12px', 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#f87171',
              textAlign: 'center',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}
        </div>

        <section className="features-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1.5rem', 
          marginTop: '4rem' 
        }}>
          <div className="feature-item" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}><Sparkles size={24} /></div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Neural Lip Sync</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Advanced Wav2Lip GAN model for high-fidelity mouth alignment.</p>
          </div>
          <div className="feature-item" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ color: 'var(--accent-secondary)', marginBottom: '1rem' }}><Sparkles size={24} /></div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Anime Optimized</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Custom LBP cascade detection tuned for 2D character portraits.</p>
          </div>
          <div className="feature-item" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}><Sparkles size={24} /></div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Privacy First</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>100% offline generation. Your data never leaves your computer.</p>
          </div>
        </section>
      </main>

      <footer style={{ marginTop: '6rem', textAlign: 'center', paddingBottom: '2rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Built with ❤️ by Mitesh • Powered by VoicePortrait Engine
        </p>
      </footer>
    </div>
  );
}

export default App;
