# 🎙️ VoicePortrait

**VoicePortrait** is a professional-grade, open-source AI platform designed to transform static 2D illustrations and anime characters into cinematic, talking narrators. By combining advanced audio analysis with frame-by-frame sprite animation and neural lip-syncing, VoicePortrait delivers high-fidelity video output optimized for 2D aesthetics.

---

## ✨ Key Features

- **🎨 2D/Anime Optimized:** Specifically engineered to handle stylized characters that traditional AI models often fail to process.
- **👄 Precision Lip-Sync:** Perfect alignment for both **Hindi and English** narration using viseme-based audio analysis.
- **⚡ 100% Local & Private:** Runs entirely on your own hardware. No expensive APIs, no cloud subscriptions, and zero data leakage.
- **🎥 Cinematic Output:** High-definition MP4 rendering with smooth frame-to-frame transitions.
- **🛠️ Custom Sprite Support:** Upload your own mouth shapes to create unique, hand-crafted animations for your characters.
- **🚀 Ultra-Fast Rendering:** Optimized for CPU and GPU, ensuring quick turnarounds for long-form narration.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite), Lucide Icons, Modern CSS3
- **Backend:** Node.js (Express), Multer for binary handling
- **AI/Audio Engine:** Python (Wav2Lip), Rhubarb Lip Sync
- **Video Processing:** FFmpeg, Sharp (Image Compositing)

---

## 📂 Project Structure

```text
VoicePortrait/
├── frontend/           # React Application
│   ├── src/
│   │   ├── components/ # UI Components (NarratorForm, etc.)
│   │   └── App.jsx     # Main Logic
├── backend/            # Express Server
│   ├── controllers/    # Rhubarb & Wav2Lip Orchestration
│   ├── routes/         # API Endpoints
│   ├── uploads/        # Temporary Frame & Audio Storage
│   └── rhubarb/        # Rhubarb Lip Sync Binaries
└── README.md
```

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/voiceportrait.git
cd voiceportrait
```

### 2. Backend Setup
```bash
cd backend
npm install
# Ensure FFmpeg is installed on your system path
```

### 3. AI Weights & Binaries
- Download `rhubarb-lip-sync` and place it in the `backend/rhubarb/` directory.
- (Optional) Download `wav2lip_gan.pth` if using neural mode.

### 4. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

---

## 📖 Usage

1. **Upload Base Image:** Select a high-quality PNG of your character (ensure they have a clear face).
2. **Upload Audio:** Provide a Narration file (MP3 or WAV).
3. **(Optional) Add Mouths:** Upload a ZIP of custom mouth shapes (A-F) for your specific character.
4. **Generate:** Click "Generate Cinematic Video" and wait for the local engine to stitch your masterpiece!

---

## 📜 Credits

This project stands on the shoulders of giants. Special thanks to:

- **[Wav2Lip](https://github.com/Rudrabha/Wav2Lip):** For the neural lip-sync foundation.
- **[Rhubarb Lip Sync](https://github.com/DanielSWolf/rhubarb-lip-sync):** For the incredible 2D audio-to-viseme engine.
- **[FFmpeg](https://ffmpeg.org/):** The Swiss Army knife for our video processing pipeline.

---

## 🔮 Future Improvements

- [ ] **AI Blinking:** Automatic eye-blink detection for static portraits.
- [ ] **Head Motion:** Adding subtle parallax shifts to make the narrator feel alive.
- [ ] **One-Click 2D Extraction:** Automatically generating mouth sprites from a single reference image.
- [ ] **Expressive Mode:** Emotional tone analysis to swap mouth shapes based on sentiment.

---

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by [Your Name]
</p>
