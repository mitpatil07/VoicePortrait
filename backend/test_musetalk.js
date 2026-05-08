import { client } from "@gradio/client";

async function test() {
    try {
        const app = await client("KlingTeam/LivePortrait");
        console.log(await app.view_api());
    } catch (e) {
        console.error(e);
    }
}
test();
