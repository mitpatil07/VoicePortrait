import { client, handle_file } from "@gradio/client";
import fs from 'fs';

async function run() {
  try {
    fs.writeFileSync('dummy.jpg', 'fake image data');
    fs.writeFileSync('dummy.wav', 'fake audio data');

    const app = await client("manavisrani07/Gradio-Lipsync-Wav2lip");
    console.log("Connected to Wav2Lip...");
    
    const result = await app.predict("/generate", [
        handle_file('dummy.jpg'), // Video or Image
        handle_file('dummy.wav'), // Audio
        "wav2lip_gan",            // Checkpoint
        0,                        // Pad Top
        10,                       // Pad Bottom
        0,                        // Pad Left
        0,                        // Pad Right
        1                         // Resize Factor
    ]);
    console.log(result);
  } catch (err) {
    console.error("PREDICT ERROR:", err.message);
  }
}
run();
