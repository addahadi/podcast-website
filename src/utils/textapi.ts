import { GoogleGenAI, Modality } from "@google/genai";
import { ElevenLabsClient} from "elevenlabs";

const client = new ElevenLabsClient({
    apiKey: "sk_7dfec89f4f350abe70e666ff8e53cdde2bc06797d8f3d888",
});

const ai = new GoogleGenAI({ apiKey: "AIzaSyBpPlwMoFl8ekej68wzCMMj51_ci2douZ0" });


export async function Voices(){
    const {voices} = await client.voices.getAll();
    return voices
}


export async function generatespeech(text:string , voiceId : string){
    
    const audio = await  client.generate({
        voice:voiceId,
        text:text,
        model_id:"eleven_multilingual_v2"
    })
    return audio
}





// this is a request for generating an image
export async function GenImg(text: string){
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: text,
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      });
      if(response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          const base64 = part?.inlineData?.data;
          if(base64){
            const blob = new Blob(
              [Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))],
              {
                type: part?.inlineData?.mimeType || "image/png",
              }
            );
            const url = URL.createObjectURL(blob);
            return url 
          }
        }
      }
}



