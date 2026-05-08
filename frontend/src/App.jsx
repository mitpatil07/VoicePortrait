import { useState } from 'react';
import NarratorForm from './components/NarratorForm';
import GenerationProgress from './components/GenerationProgress';
import VideoResult from './components/VideoResult';

function App() {
  const [appState, setAppState] = useState('idle'); // idle, generating, completed, error
  const [videoUrl, setVideoUrl] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGenerate = async (formData) => {
    setAppState('generating');
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:5000/api/video/generate', {
        method: 'POST',
        body: formData, // FormData containing image and audio
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate video');
      }

      setVideoUrl(data.videoUrl);
      setAppState('completed');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
      setAppState('error');
    }
  };

  const handleReset = () => {
    setAppState('idle');
    setVideoUrl(null);
    setErrorMsg('');
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>AI Talking Narrator</h1>
        <p>Cinematic Documentary Video Generator</p>
      </header>

      <main className="glass-panel">
        {appState === 'idle' && <NarratorForm onGenerate={handleGenerate} />}
        
        {appState === 'generating' && <GenerationProgress />}
        
        {appState === 'completed' && <VideoResult videoUrl={videoUrl} onReset={handleReset} />}
        
        {appState === 'error' && (
          <div className="error-container" style={{ textAlign: 'center', color: '#ff6b6b' }}>
            <h2>Generation Failed</h2>
            <p>{errorMsg}</p>
            <button className="btn btn-secondary" onClick={handleReset} style={{ marginTop: '1rem' }}>
              Try Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
