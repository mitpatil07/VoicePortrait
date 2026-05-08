import React, { useState, useRef } from 'react';
import { ImageIcon, FileAudio, Play, X, CheckCircle } from 'lucide-react';

export default function NarratorForm({ onGenerate }) {
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAudioChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const clearImage = (e) => {
    e.stopPropagation();
    setImageFile(null);
    setImagePreview(null);
  };

  const clearAudio = (e) => {
    e.stopPropagation();
    setAudioFile(null);
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
    <form onSubmit={handleSubmit} className="narrator-form" style={{ gap: '1.5rem' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: imagePreview ? '380px 1fr' : '1fr 1fr', 
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        {/* Image Section */}
        <div className="form-group">
          <label style={{ fontSize: '0.85rem', marginBottom: '8px', display: 'block' }}>Portrait</label>
          <input 
            type="file" 
            accept="image/*" 
            ref={imageInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <div 
            className={`file-drop-area ${imageFile ? 'has-file' : ''}`} 
            onClick={() => imageInputRef.current.click()}
            style={{ 
              height: '280px', 
              padding: imagePreview ? '0' : '1.5rem',
              minHeight: 'unset'
            }}
          >
            {imagePreview ? (
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#f8fafc' }} 
                />
                <button onClick={clearImage} className="clear-btn" style={{ position: 'absolute', top: '8px', right: '8px', background: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: 'none', color: '#ef4444' }}>
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <ImageIcon size={24} style={{ color: 'var(--accent-primary)', marginBottom: '10px' }} />
                <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>Add Photo</div>
              </div>
            )}
          </div>
        </div>

        {/* Audio Section */}
        <div className="form-group">
          <label style={{ fontSize: '0.85rem', marginBottom: '8px', display: 'block' }}>Narration</label>
          <input 
            type="file" 
            accept="audio/*" 
            ref={audioInputRef}
            onChange={handleAudioChange}
            style={{ display: 'none' }}
          />
          <div 
            className={`file-drop-area ${audioFile ? 'has-file' : ''}`} 
            onClick={() => audioInputRef.current.click()}
            style={{ 
              height: '280px', 
              padding: '1.5rem',
              minHeight: 'unset'
            }}
          >
            {audioFile ? (
              <div style={{ textAlign: 'center' }}>
                <CheckCircle size={32} style={{ color: '#10b981', marginBottom: '12px' }} />
                <div style={{ fontSize: '0.85rem', fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{audioFile.name}</div>
                <button onClick={clearAudio} style={{ marginTop: '10px', fontSize: '0.75rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Change Audio</button>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <FileAudio size={24} style={{ color: 'var(--accent-primary)', marginBottom: '10px' }} />
                <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>Add Audio</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        className="btn-primary"
        disabled={!imageFile || !audioFile}
        style={{ 
          width: '100%', 
          height: '55px', 
          fontSize: '1rem',
          marginTop: '0.5rem'
        }}
      >
        <Play size={18} fill="currentColor" />
        Generate Portrait
      </button>
    </form>
  );
}
