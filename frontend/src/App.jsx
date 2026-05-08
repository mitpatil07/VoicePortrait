import React, { useState, useRef } from 'react';
import NarratorForm from './components/NarratorForm';
import GenerationProgress from './components/GenerationProgress';
import VideoResult from './components/VideoResult';
import axios from 'axios';
import { 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Video, 
  Music, 
  Layers,
  ArrowRight,
  Monitor,
  CheckCircle2
} from 'lucide-react';

function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const handleGenerate = async (formData) => {
    setIsGenerating(true);
    setVideoUrl(null);
    setError(null);
    
    // Initialize new abort controller
    abortControllerRef.current = new AbortController();

    document.getElementById('studio').scrollIntoView({ behavior: 'smooth' });

    try {
      const response = await axios.post('http://localhost:5000/api/videos/generate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        signal: abortControllerRef.current.signal
      });
      setVideoUrl(response.data.videoUrl);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Generation cancelled by user');
        setError('Generation was cancelled.');
      } else {
        console.error(err);
        setError(err.response?.data?.error || 'Something went wrong during generation.');
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return (
    <div className="app-container">
      <nav>
        <div className="logo-text">VoicePortrait</div>
        <div className="nav-links">
          <a href="#studio">Studio</a>
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
        </div>
        <button className="btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '0.95rem' }} onClick={() => document.getElementById('studio').scrollIntoView()}>
          Create Now
        </button>
      </nav>

      <section className="hero">
        <div className="badge">New: High-Res Anime Support</div>
        <h1>Bring Your Characters <br/> To Life with AI.</h1>
        <p>
          Transform any static illustration into a professional cinematic narrator. 
          The world's most advanced 2D-optimized neural lip-sync engine.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <button className="btn-primary" style={{ padding: '1.2rem 3rem' }} onClick={() => document.getElementById('studio').scrollIntoView()}>
            Launch Studio <ArrowRight size={22} />
          </button>
          <button className="btn-outline" style={{ padding: '1.2rem 3rem', background: 'white', fontWeight: '700' }}>Documentation</button>
        </div>
      </section>

      <section className="studio-section" id="studio">
        <div className="glass-card">
          <div className="card-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-1px' }}>VoicePortrait Studio</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Upload your portrait and narration to start rendering.</p>
          </div>

          {isGenerating ? (
            <GenerationProgress onCancel={handleCancel} />
          ) : videoUrl ? (
            <VideoResult url={videoUrl} onReset={() => setVideoUrl(null)} />
          ) : (
            <NarratorForm onGenerate={handleGenerate} />
          )}

          {error && (
            <div style={{ 
              marginTop: '2rem', padding: '1.5rem', borderRadius: '20px', 
              background: '#fef2f2', border: '1px solid #fee2e2', color: '#dc2626', textAlign: 'center' 
            }}>
              {error}
            </div>
          )}
        </div>
      </section>

      <section className="workflow-section" id="workflow" style={{ padding: '10rem 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '4rem' }}>Three Steps to Perfection</h2>
        <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ width: '300px' }}>
            <div style={{ fontSize: '3rem', color: '#e2e8f0', fontWeight: '800', marginBottom: '1rem' }}>01</div>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Upload Artwork</h4>
            <p style={{ color: 'var(--text-muted)' }}>Select a high-quality JPG or PNG of your character or anime portrait.</p>
          </div>
          <div style={{ width: '300px' }}>
            <div style={{ fontSize: '3rem', color: '#e2e8f0', fontWeight: '800', marginBottom: '1rem' }}>02</div>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Provide Audio</h4>
            <p style={{ color: 'var(--text-muted)' }}>Upload an MP3 or WAV file of the character's narration or dialogue.</p>
          </div>
          <div style={{ width: '300px' }}>
            <div style={{ fontSize: '3rem', color: '#e2e8f0', fontWeight: '800', marginBottom: '1rem' }}>03</div>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Neural Magic</h4>
            <p style={{ color: 'var(--text-muted)' }}>Wait 30 seconds as our AI aligns the lips and renders your cinematic MP4.</p>
          </div>
        </div>
      </section>

      <section className="features-container" id="features">
        <div className="feature-card">
          <div className="icon-box"><Music size={30} /></div>
          <h3>HD Audio Sync</h3>
          <p>Support for 44.1kHz audio ensuring every syllable is captured with pixel-perfect accuracy.</p>
        </div>
        <div className="feature-card">
          <div className="icon-box"><ShieldCheck size={30} /></div>
          <h3>Offline Security</h3>
          <p>Your assets never leave your computer. Privacy is built into the core of the engine.</p>
        </div>
        <div className="feature-card">
          <div className="icon-box"><CheckCircle2 size={30} /></div>
          <h3>One-Click Export</h3>
          <p>Directly export high-definition MP4 videos ready for immediate use in any production.</p>
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-left">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>VoicePortrait</h2>
            <p style={{ marginTop: '0.5rem' }}>The next generation of AI character animation.</p>
          </div>
          <div style={{ display: 'flex', gap: '3rem' }}>
            <div>
              <p style={{ fontWeight: '700', marginBottom: '1rem' }}>Product</p>
              <p style={{ marginBottom: '0.5rem' }}>Studio</p>
              <p>Showcase</p>
            </div>
            <div>
              <p style={{ fontWeight: '700', marginBottom: '1rem' }}>Connect</p>
              <p style={{ marginBottom: '0.5rem' }}>GitHub</p>
              <p>Twitter</p>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '4rem', color: '#94a3b8', fontSize: '0.85rem' }}>
          © 2026 VoicePortrait Engine. Developed by Mitesh.
        </div>
      </footer>
    </div>
  );
}

export default App;
