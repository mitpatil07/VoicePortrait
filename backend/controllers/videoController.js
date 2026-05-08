import fs from 'fs';
import Video from '../models/Video.js';
import mongoose from 'mongoose';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export const generateVideo = async (req, res) => {
    try {
        const { image, audio } = req.files;
        if (!image || !audio) {
            return res.status(400).json({ error: 'Please upload both image and audio files.' });
        }

        const imageFile = image[0];
        const audioFile = audio[0];

        // Save initial record
        let videoRecord;
        try {
            videoRecord = new Video({
                title: 'AI Narrator Video',
                imageUrl: `http://localhost:5000/uploads/${imageFile.filename}`,
                audioUrl: `http://localhost:5000/uploads/${audioFile.filename}`,
                status: 'processing'
            });
            await videoRecord.save();
        } catch (dbError) {
            console.warn('Database not available, skipping save.');
        }

        console.log('Running Local Wav2Lip AI locally on your system...');
        
        const pythonPath = path.join(process.cwd(), 'venv', 'Scripts', 'python.exe');
        const inferenceScript = path.join(process.cwd(), 'Wav2Lip', 'inference.py');
        const checkpointPath = path.join(process.cwd(), 'Wav2Lip', 'checkpoints', 'wav2lip_gan.pth');
        
        const facePath = imageFile.path;
        const audioPath = audioFile.path;
        
        const outputFileName = `output_${Date.now()}.mp4`;
        const outputPath = path.join(process.cwd(), 'uploads', outputFileName);

        // Run Wav2Lip
        const command = `"${pythonPath}" "inference.py" --checkpoint_path "checkpoints\\wav2lip_gan.pth" --face "${facePath}" --audio "${audioPath}" --outfile "${outputPath}" --nosmooth`;

        console.log('Executing Command:', command);
        
        try {
            const { stdout, stderr } = await execPromise(command, { cwd: path.join(process.cwd(), 'Wav2Lip') });
            console.log('Wav2Lip Output:', stdout);
        } catch (execError) {
            console.error('Wav2Lip Execution Failed:', execError.stderr);
            return res.status(500).json({ error: 'Local AI Generation Failed. Ensure FFmpeg is installed.' });
        }

        const videoUrl = `http://localhost:5000/uploads/${outputFileName}`;
        console.log('Wav2Lip generation complete!', videoUrl);

        if (videoRecord) {
            videoRecord.videoUrl = videoUrl;
            videoRecord.status = 'completed';
            await videoRecord.save();
        }

        res.status(200).json({
            message: 'Video generated successfully!',
            videoUrl
        });

    } catch (error) {
        console.error('Error generating video:', error);
        res.status(500).json({ error: 'Failed to generate video.' });
    }
};
