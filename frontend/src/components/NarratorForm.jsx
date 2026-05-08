import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, FileAudio, Video } from 'lucide-react';

export default function NarratorForm({ onGenerate }) {
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [mouthFiles, setMouthFiles] = useState([]);
  
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const mouthsInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleAudioChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const handleMouthsChange = (e) => {
    if (e.target.files) {
      setMouthFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageFile || !audioFile) return;

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('audio', audioFile);
    mouthFiles.forEach(file => {
      formData.append('mouths', file);
    });

    onGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Character Image (PNG/JPG)</label>
        <div className="file-drop-area">
          <input 
            type="file" 
            accept="image/png, image/jpeg" 
            ref={imageInputRef}
            onChange={handleImageChange}
          />
          <ImageIcon size={32} className="file-icon" />
          <div className="file-drop-text">
            {imageFile ? (
              <span style={{ color: 'var(--text-main)' }}>{imageFile.name}</span>
            ) : (
              <>Click to browse or <strong>drag image here</strong></>
            )}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Narration Audio (WAV/MP3)</label>
        <div className="file-drop-area">
          <input 
            type="file" 
            accept="audio/wav, audio/mpeg, audio/mp3" 
            ref={audioInputRef}
            onChange={handleAudioChange}
          />
          <FileAudio size={32} className="file-icon" />
          <div className="file-drop-text">
            {audioFile ? (
              <span style={{ color: 'var(--text-main)' }}>{audioFile.name}</span>
            ) : (
              <>Click to browse or <strong>drag audio here</strong></>
            )}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Mouth Sprites (A.png, B.png, etc. - Optional)</label>
        <div className="file-drop-area">
          <input 
            type="file" 
            multiple
            accept="image/png" 
            ref={mouthsInputRef}
            onChange={handleMouthsChange}
          />
          <ImageIcon size={32} className="file-icon" />
          <div className="file-drop-text">
            {mouthFiles.length > 0 ? (
              <span style={{ color: 'var(--text-main)' }}>{mouthFiles.length} sprites selected</span>
            ) : (
              <>Optional: Select <strong>mouth sprites</strong> (A-F)</>
            )}
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={!imageFile || !audioFile}
      >
        <Video size={20} />
        Generate Cinematic Video
      </button>
    </form>
  );
}
