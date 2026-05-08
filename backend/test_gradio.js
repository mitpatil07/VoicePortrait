import { client } from "@gradio/client";

async function run() {
  try {
    const app = await client("manavisrani07/Gradio-Lipsync-Wav2lip");
    const app_info = await app.view_api();
    console.log(JSON.stringify(app_info, null, 2));
  } catch (err) {
    console.error(err);
  }
}
run();
