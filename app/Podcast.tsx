import { useEffect, useState } from "react"
import GeneratePodcast from "../src/component/GeneratePodcast"
import { PodcastCardProps, PodcastProps , Voice } from "../src/utils/type"
import { Voices } from "../src/utils/textapi"
import GenerateImg from "../src/component/GenerateImg"
import { database, stg } from "../src/utils/fireConfig"
import { serverTimestamp } from "firebase/firestore"
import { Loader } from "rsuite"
import { ThrowError } from "@/utils/utils"



const uploadAudioToFirebaseStorage = async (userID: string, podcastID: string, file: string) => {
  const storageRef = stg.ref()
  const audioRef = storageRef.child(`users/${userID}/podcasts/${podcastID}/audio.mp3`);
  const ConUrl =await fetch(file)
  const blob  =await ConUrl.blob()
  await audioRef.put(blob).then(()=>{
    console.log("it work img")
  })
  return await audioRef.getDownloadURL()
};

const uploadImageToFirebaseStorage = async (userID: string, podcastID: string, file: string) => { 
  const storageRef = stg.ref();
  const imgRef = storageRef.child(`users/${userID}/podcasts/${podcastID}/coverImage.png`);
  const ConUrl =await fetch(file)
  const blob  =await ConUrl.blob()
  await imgRef.put(blob).then(()=>{
    console.log("it work img")
  })
  return await imgRef.getDownloadURL()
};


const Podcast = ({User , setPodcastID }:PodcastProps ) => {

  const [voiceA , setVoiceA] = useState<Voice>([])
  const [voice , setVoice] = useState('')
  const [text , setText] = useState<string>('')
  const [desc , setDesc] = useState<string>('')
  const [imgUrl , setImgUrl] = useState<string | ArrayBuffer | null>(null)
  const [speech , setSpeech] = useState<string>('')
  const [name ,setName] = useState<string>('')
  const [loading , setLoading] = useState<boolean>(false)



  useEffect(()=>{
    async function handle(){
      const V = await Voices()

      setVoiceA(V.map((value)=>{
        const newV = {
          name : value.name ,
          voice_id : value.voice_id
        }
        return newV
      }))
    }
    handle()
  },[User])

  function handleSelect(value : string): void{
    setVoice(value)
  }

  async function CreatePodcast(){
    if(!User?.email){ 
      return
    }
    if(!ThrowError({
      name : name ,
      text : text , 
      desc : desc ,
      voice : voice,
      img:imgUrl,
    })) return 
    try {
      setLoading(true)
      const podcastID = database.collection("users").doc(User.email).collection('podcasts').doc().id
      setPodcastID(podcastID)
      if(typeof imgUrl === 'string'){
        const audioURL = await uploadAudioToFirebaseStorage(User.email, podcastID, speech);
        const imgURL   = await uploadImageToFirebaseStorage(User.email, podcastID, imgUrl);
        await database.collection('users').doc(User.email).collection('podcasts').doc(podcastID).set({
          podcastName: name ?? '',
          podcastDesc: desc ?? '',
          audioURL,
          imgURL,
          view : 0 ?? '',
          author : User.email.split('@')[0] ?? '',
          createdAt: serverTimestamp() ?? '',        
        });
      }
    }
    catch(error){
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <section className="w-full flex flex-col gap-5">
      <h1 className="text-white-2 font-bold text-2xl">Create Podcast</h1>
      <form>
        <div className="flex flex-col">
          <label className="text-white-1 mb-2 ">Podcast title</label>
          <input onChange={(e)=> setName(e.target.value)} value={name} type="text" className="w-full text-white-2  bg-black-8 h-14 p-4 rounded-sm outline-mouve-1 
          " placeholder="Enter name"/>
        </div>
        
        <div className="flex flex-col mt-10">
          <label className="text-white-1 mb-2 ">Category</label>
          <select  name="select" onChange={(e)=>handleSelect(e.target.value)} value={voice} 
          className="w-full text-white-1  bg-black-8 h-14 p-4  text-white-2 rounded-sm outline-mouve-1">
            <option value = "" className= " text-white-1 hover:bg-mouve-1" >select</option>
            {voiceA.map((value,index)=>{
              return <option className="text-white-1 hover:bg-mouve-1" key={index} value={value.name}>{value.name}</option>
            })}
          </select>
        </div>

        <div className="flex flex-col mt-10">
          <label className="text-white-1 mb-2 ">Description</label>
          <textarea placeholder="describe your podcast" value={desc} onChange={(e) => setDesc(e.target.value)} rows={4} cols={50} className="w-full bg-black-8 text-white-2 p-4 pb-24  rounded-sm" />
        </div>

      </form>
      <div className="w-full h-[2px] bg-white-5 mt-8"></div>
      <form onSubmit={(e)=> e.preventDefault()}>
        <GeneratePodcast speech={speech} setSpeech={setSpeech} voice={voice}  User={User}   setText = {setText} text={text}/>
        <GenerateImg imgUrl={imgUrl} setImgUrl={setImgUrl} text={text}/>
      </form>
      <button onClick={CreatePodcast} className="w-full h-12 bg-red-1 text-center font-bold text-lg text-white-1 
      hover:border hover:text-white-1 hover:border-red-1 hover:bg-[#000] transition ease delay-50
      ">
        {loading ? (
            <div className="flex flex-row gap-2 justify-center items-center">
              <Loader color="white"  content="generating"  size="sm" speed="slow" />              
            </div>
          ): "Click here"}

      </button>
    </section>
  )
}

export default Podcast