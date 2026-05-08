import fs from 'fs';
import https from 'https';
import path from 'path';

const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
            }
            if (response.statusCode !== 200) {
                return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
};

async function run() {
    const s3fdUrl = 'https://www.adrianbulat.com/downloads/python-fan/s3fd-619a316812.pth';
    const s3fdDest = path.join(process.cwd(), 'Wav2Lip', 'face_detection', 'detection', 'sfd', 's3fd.pth');

    const ganUrl = 'https://huggingface.co/camenduru/Wav2Lip/resolve/main/checkpoints/wav2lip_gan.pth';
    const ganDest = path.join(process.cwd(), 'Wav2Lip', 'checkpoints', 'wav2lip_gan.pth');

    console.log('Downloading s3fd.pth (Face Detection Model)...');
    fs.mkdirSync(path.dirname(s3fdDest), { recursive: true });
    await downloadFile(s3fdUrl, s3fdDest);
    console.log('Downloaded s3fd.pth!');

    console.log('Downloading wav2lip_gan.pth (Wav2Lip GAN Model)...');
    fs.mkdirSync(path.dirname(ganDest), { recursive: true });
    await downloadFile(ganUrl, ganDest);
    console.log('Downloaded wav2lip_gan.pth!');
}

run().catch(console.error);
