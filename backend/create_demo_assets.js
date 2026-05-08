import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function createAssets() {
    const dir = './demo_assets';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    // 1. Base Head (Circle)
    const baseHead = Buffer.from(
        `<svg width="500" height="500">
            <circle cx="250" cy="250" r="200" fill="#2c3e50" />
            <circle cx="180" cy="200" r="20" fill="white" />
            <circle cx="320" cy="200" r="20" fill="white" />
        </svg>`
    );
    await sharp(baseHead).png().toFile(path.join(dir, 'base.png'));

    // 2. Mouth Shapes (A-F)
    const mouthShapes = {
        'A': '<rect width="100" height="10" fill="#e74c3c" />', // Closed
        'B': '<rect width="100" height="20" fill="#e74c3c" />', // Slightly open
        'C': '<rect width="100" height="40" fill="#e74c3c" />', // Open
        'D': '<rect width="100" height="60" fill="#e74c3c" />', // Wide open
        'E': '<rect width="60" height="20" fill="#e74c3c" />',  // Small
        'F': '<rect width="20" height="20" fill="#e74c3c" />',  // Tiny/O
        'G': '<rect width="80" height="15" fill="#e74c3c" />',  // F/V
        'H': '<rect width="100" height="30" fill="#e74c3c" />', // L
        'X': '<rect width="100" height="2" fill="#e74c3c" />'   // Silent
    };

    for (const [key, svgRect] of Object.entries(mouthShapes)) {
        // Extract width and height from rect string
        const w = svgRect.match(/width="(\d+)"/)[1];
        const h = svgRect.match(/height="(\d+)"/)[1];
        
        const mouthSvg = Buffer.from(
            `<svg width="${w}" height="${h}">
                ${svgRect}
            </svg>`
        );
        await sharp(mouthSvg).png().toFile(path.join(dir, `${key}.png`));
    }

    console.log('Demo assets created in ./demo_assets');
}

createAssets().catch(console.error);
