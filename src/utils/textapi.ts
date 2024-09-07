import { ElevenLabsClient} from "elevenlabs";
import * as fal from "@fal-ai/serverless-client";

const client = new ElevenLabsClient({ apiKey: "sk_a6a497484b84d902157e0b6e86a3737a406de03d55d9ae5c" });

// this is a request for generating available voices
export async function Voices(){
    const {voices} = await client.voices.getAll();
    return voices
}


// this is request for generating img 

fal.config({
    credentials: "6f1b9bcb-41e3-4f22-b02b-87818b539e81:d888b09d3099d3581d82da8fe9577c04"
});

export async function GenImg(text: string){
    const result: any = await fal.subscribe("fal-ai/flux/dev", {
        input: {
            prompt: text,
            image_size : "square"
        },
        logs: true,
    })
    return result.images[0]
}


// this is a request for generating an audio
export async function generatespeech(text:string , voiceId : string){
    
    const audio = await  client.generate({
        voice:voiceId,
        text:text,
        model_id:"eleven_multilingual_v2"
    })
    return audio
}
