import { Download, RefreshCw } from 'lucide-react';

export default function VideoResult({ videoUrl, onReset }) {
  const handleDownload = async () => {
    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `narrator-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Failed to download video:', err);
      // Fallback
      window.open(videoUrl, '_blank');
    }
  };

  return (
    <div className="video-result-container">
      <div className="video-wrapper">
        <video 
          controls 
          autoPlay 
          src={videoUrl}
          style={{ width: '100%', display: 'block', backgroundColor: '#000' }}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="actions">
        <button className="btn btn-secondary" onClick={onReset}>
          <RefreshCw size={20} />
          Create Another
        </button>
        <button className="btn btn-primary" onClick={handleDownload} style={{ margin: 0 }}>
          <Download size={20} />
          Download HD Video
        </button>
      </div>
    </div>
  );
}
