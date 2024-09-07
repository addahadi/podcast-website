import { useState } from "react"
import { podcastdata } from "../utils/type"

interface podcast_card<T>{
  handleClick<T>(arg:T) : void
  value : T
}

function PodcastCard<T extends podcastdata>({value,handleClick}:podcast_card<T>){
  const [ishover , setIshover]= useState(false)

  return (
    <div className='cursor-pointer w-fit m-auto'  onClick={() => handleClick(value)}>
      <div className=" relative w-full">
        <img onMouseOver={()=> setIshover(true)} onMouseLeave={()=> setIshover(false)} className='rounded-sm hover:filter hover:blur-[2px] transition ease delay-75 w-[280px] relative m-auto' src={value.imgURL}/>
        {ishover ? 
        <div className=" w-[40px] h-[40px] flex justify-center  items-center absolute top-2/4 left-2/4" style={{transform:'translate(-50% , -50%)'}}>
          <img src="../public/icons/pause.svg" width={50} height={50}/>
        </div>
        : ''}
      </div>
      <h1 className='text-white-1 font-bold text-sm mt-3 text-center  break-words'>{value.podcastName.slice(0,60)}...</h1>
  </div>)
}



export default PodcastCard