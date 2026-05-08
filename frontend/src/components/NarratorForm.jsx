import React, { useState, useRef } from 'react';
import { Upload, ImageIcon, FileAudio, Play } from 'lucide-react';

export default function NarratorForm({ onGenerate }) {
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageFile || !audioFile) return;

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('audio', audioFile);

    onGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="narrator-form">
      <div className="form-group">
        <label>Character Portrait (JPG/PNG)</label>
        <input 
          type="file" 
          accept="image/*" 
          ref={imageInputRef}
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <div className="file-drop-area" onClick={() => imageInputRef.current.click()}>
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
        <input 
          type="file" 
          accept="audio/*" 
          ref={audioInputRef}
          onChange={handleAudioChange}
          style={{ display: 'none' }}
        />
        <div className="file-drop-area" onClick={() => audioInputRef.current.click()}>
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

      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={!imageFile || !audioFile}
      >
        <Play size={20} fill="currentColor" />
        Generate Cinematic Video
      </button>
    </form>
  );
}
