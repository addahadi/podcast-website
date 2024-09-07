import { useRef, useState } from "react"
import { GenImg } from "../utils/textapi"
import { GenerateImageProps } from "../utils/type"



const GenerateImg = ({text , imgUrl , setImgUrl} : GenerateImageProps) => {
  
  const [isThumbnail , setIsThumbnail] = useState<boolean>(false)
  const [loading , setLoading] = useState<boolean>(false)
  const imgRef = useRef<HTMLInputElement>(null)
  
  function UploadImg(e:React.ChangeEvent<HTMLInputElement>){
    e.preventDefault()
    let file 
    
    if(e.target.files){
      file = e.target.files[0]
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        console.log(reader.result)
        setImgUrl(reader.result); // Set the image preview (if needed)
        setLoading(true)
      }
      reader.readAsDataURL(file); // Start reading the file
    } else {
      setImgUrl(null);
    }
  }
  async function RenderImg(){
    
    if(!text){
      return 
    }
    try { 
      const {url} : {url : string} = await GenImg(text)
      setImgUrl(url)
    }
    catch(error){
      console.log(error)
    }

  }
  return (
    <section className="mt-12">
      <h2 className="text-white-1">Podcast Img</h2>
      <div className=" mt flex flex-row  w-full  border-2 border-black-5 ">
        <button onClick={() => {
          setIsThumbnail(true)
          RenderImg()
        }}  style={isThumbnail ? {backgroundColor:"#242424"}
        : {}}
        className="p-4 w-3/6 text-center  items-center text-white-1 font-bold   cursor-pointer">Generate Img</button>
        <button onClick={() => setIsThumbnail(false)}  style={!isThumbnail ? {backgroundColor:"#242424"}
        : {}}
        className="p-4 w-3/6 text-center  text-white-1 font-bold  cursor-pointer">Upload Img</button>
      </div>
      {
        !isThumbnail ? (
      <section className="image_div" onClick={()=> {
        imgRef?.current?.click()
      }}>
        <input ref={imgRef} type="file" className=" hidden "
        onChange={(e)=> UploadImg(e)}
        />
        {!loading ? (
          <div className="flex justify-center items-center flex-col gap-3">
            <img  src="../public/icons/upload-image.svg" width={50} height={30}/>
            <h2 className="text-12 text-red-1 font-bold">Click to upload</h2>
            <h2 className="text-12 text-white-3 font-bold">PNG SVG PDF max(1080p)</h2>
          </div>
        ): <img src={typeof imgUrl === "string" ?  imgUrl : ""} className="h-full "/> }
      </section>) :
      <div className="flex justify-center items-center">
        <img src={typeof imgUrl === "string" ?  imgUrl : ""} className=" rounded-md" width={200} height={200}/>
      </div>
      }
    </section>
  )
}

export default GenerateImg