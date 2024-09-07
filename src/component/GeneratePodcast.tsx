import { useState } from "react"
import { generatespeech } from "../utils/textapi"
import { GenerateTxtProps } from "../utils/type"
import { Loader } from "rsuite"
import "rsuite/dist/rsuite.min.css";
import { ThrowError } from "@/utils/utils";
const GeneratePodcast = ({voice, User, setText, speech , setSpeech , text}:GenerateTxtProps) => {

  const [loading, setLoading] = useState<boolean>(false)
  const [audioDis , setAudioDis] = useState<boolean>(false)
  async function handleClick(): Promise<void> {
    if(!User) return
    if(!ThrowError({
      voice:voice,
      text:text
    })) {
      return 
    } 
    try{
        setLoading(true)
        if(!voice) return 
        const audio = await generatespeech(text, voice);
        const chunks : Buffer[] = []
        for await (const chunk of audio){
            chunks.push(chunk)
        }    
        // Combine the chunks into a single blob
        const audioBlob = new Blob(chunks, { type: 'audio/mpeg' });
        const Url = URL.createObjectURL(audioBlob)
        setSpeech(Url)
    }
    catch(error : any){
      console.log(error)
    }
    finally{
      setLoading(false)
      setAudioDis(true)
    }
  }
  return (
    <div>
        <label className="text-white-1">Podcast Text</label>
        <textarea cols={50} rows={4}
        className=" text-white-1  mt-2 outline-red-1    rounded-sm border-none pb-[100px] p-5 w-full h-36 bg-black-8
        active:  focus:outline-none
        " placeholder="write some text ..."    
        value={text} onChange={(e)=> setText(e.target.value)} />
        <button  className="w-40  h-10 mt-4 rounded-sm cursor-pointer bg-red-1 text-white-1
        hover:border hover:text-white-1 hover:border-red-1 hover:bg-[#000] transition ease delay-50
        "  onClick={handleClick}>
          {loading ? (
            <div className="flex flex-row gap-2 justify-center items-center">
              <Loader color="white"  content="generating"  size="sm" speed="slow" />              
            </div>
          ): "Click here"}
        </button>
        {
          audioDis ? 
          <audio id="audioPlayer" className=" mt-4" src={speech} controls></audio>
          : ""
        }

    </div>

  )
}

export default GeneratePodcast