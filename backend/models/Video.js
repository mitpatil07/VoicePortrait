import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    sourceImage: {
        type: String,
        required: true
    },
    sourceAudio: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending'
    },
    error: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model('Video', videoSchema);
