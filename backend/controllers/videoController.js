import fs from 'fs';
import Video from '../models/Video.js';
import mongoose from 'mongoose';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';
import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';

const execPromise = util.promisify(exec);

export const generateVideo = async (req, res) => {
    try {
        if (!req.files || !req.files.image || !req.files.audio) {
            return res.status(400).json({ error: 'Image and Audio files are required.' });
        }

        const imageFile = req.files.image[0];
        const audioFile = req.files.audio[0];

        let videoRecord = null;
        if (mongoose.connection.readyState === 1) {
            videoRecord = new Video({
                sourceImage: imageFile.filename,
                sourceAudio: audioFile.filename,
                status: 'processing'
            });
            await videoRecord.save();
        }

        console.log('Running Rhubarb 2D Animation Pipeline...');
        
        const rhubarbPath = path.join(process.cwd(), 'rhubarb', 'Rhubarb-Lip-Sync-1.13.0-Windows', 'rhubarb.exe');
        let audioPath = audioFile.path;
        const outputJsonPath = path.join(process.cwd(), 'uploads', `timing_${Date.now()}.json`);
        
        // 1. Convert to WAV if needed (Rhubarb only supports .wav and .ogg)
        if (!audioPath.endsWith('.wav')) {
            console.log('Step 0: Converting audio to WAV...');
            const wavPath = audioPath.replace(path.extname(audioPath), '.wav');
            await new Promise((resolve, reject) => {
                ffmpeg(audioPath)
                    .toFormat('wav')
                    .on('end', () => {
                        audioPath = wavPath;
                        resolve();
                    })
                    .on('error', reject)
                    .save(wavPath);
            });
        }

        // 2. Run Rhubarb to get timings
        console.log('Step 1: Analyzing audio with Rhubarb...');
        await execPromise(`"${rhubarbPath}" -f json -o "${outputJsonPath}" "${audioPath}"`);
        const timingData = JSON.parse(fs.readFileSync(outputJsonPath, 'utf8'));
        
        // 2. Prepare for rendering
        console.log('Step 2: Detecting face for positioning...');
        const baseImagePath = imageFile.path;
        
        // Find face coordinates
        const pythonPath = path.join(process.cwd(), 'venv', 'Scripts', 'python.exe');
        const { stdout: faceCoordsRaw } = await execPromise(`"${pythonPath}" get_face_coords.py "${baseImagePath}"`);
        const faceCoords = JSON.parse(faceCoordsRaw);

        if (!faceCoords) {
            console.warn('Face not detected for positioning, defaulting to center.');
        }

        console.log('Step 3: Generating frames...');
        const tempFramesDir = path.join(process.cwd(), 'uploads', `frames_${Date.now()}`);
        fs.mkdirSync(tempFramesDir);

        const getMouthPath = (key) => {
            const uploadedMouth = req.files.mouths?.find(m => m.originalname.startsWith(key));
            if (uploadedMouth && fs.existsSync(uploadedMouth.path)) return uploadedMouth.path;
            const demoPath = path.join(process.cwd(), 'demo_assets', `${key}.png`);
            if (fs.existsSync(demoPath)) return demoPath;
            return path.join(process.cwd(), 'demo_assets', 'X.png');
        };

        const duration = timingData.metadata.duration;
        const fps = 24;
        const totalFrames = Math.ceil(duration * fps);
        
        // Pre-calculate mouth size and position
        const baseMetadata = await sharp(baseImagePath).metadata();
        const mouthW = faceCoords ? Math.round(faceCoords.w * 0.4) : Math.round(baseMetadata.width * 0.1);
        const mouthH = faceCoords ? Math.round(faceCoords.h * 0.2) : Math.round(baseMetadata.height * 0.05);
        const mouthX = faceCoords ? Math.round(faceCoords.x + (faceCoords.w - mouthW) / 2) : Math.round((baseMetadata.width - mouthW) / 2);
        const mouthY = faceCoords ? Math.round(faceCoords.y + faceCoords.h * 0.7) : Math.round(baseMetadata.height * 0.7);

        for (let i = 0; i < totalFrames; i++) {
            const currentTime = i / fps;
            const cue = timingData.mouthCues.find(c => currentTime >= c.start && currentTime <= c.end) || { value: 'X' };
            
            const mouthPath = getMouthPath(cue.value);
            const framePath = path.join(tempFramesDir, `frame_${String(i).padStart(5, '0')}.png`);

            // Resize mouth to fit face and composite
            const mouthBuffer = await sharp(mouthPath)
                .resize(mouthW, mouthH, { fit: 'fill' })
                .toBuffer();

            await sharp(baseImagePath)
                .composite([{ input: mouthBuffer, top: mouthY, left: mouthX }])
                .toFile(framePath);
        }

        // 3. Stitch with FFmpeg
        console.log('Step 4: Stitching video with FFmpeg...');
        const outputFileName = `output_${Date.now()}.mp4`;
        const outputPath = path.join(process.cwd(), 'uploads', outputFileName);

        await new Promise((resolve, reject) => {
            const framePattern = path.join(tempFramesDir, 'frame_%05d.png').replace(/\\/g, '/');
            ffmpeg()
                .on('start', (commandLine) => {
                    console.log('Spawned FFmpeg with command: ' + commandLine);
                })
                .input(framePattern)
                .inputFPS(fps)
                .input(audioPath)
                .outputOptions([
                    '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2',
                    '-c:v libx264',
                    '-pix_fmt yuv420p',
                    '-shortest'
                ])
                .on('end', resolve)
                .on('error', (err, stdout, stderr) => {
                    console.error('FFmpeg Error:', err.message);
                    console.error('FFmpeg Stderr:', stderr);
                    reject(err);
                })
                .save(outputPath);
        });

        // Cleanup temp frames
        fs.rmSync(tempFramesDir, { recursive: true, force: true });

        const videoUrl = `http://localhost:5000/uploads/${outputFileName}`;
        console.log('Animation complete:', videoUrl);

        if (videoRecord) {
            videoRecord.videoUrl = videoUrl;
            videoRecord.status = 'completed';
            await videoRecord.save();
        }

        res.status(200).json({ 
            message: 'Video generated successfully', 
            videoUrl: videoUrl 
        });

    } catch (error) {
        console.error('Error generating video:', error);
        res.status(500).json({ error: error.message || 'An error occurred during video generation' });
    }
};
