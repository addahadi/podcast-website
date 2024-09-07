import { useEffect, useState } from "react"

import { PodcastProps, podcastdata } from "../src/utils/type"
import { APIController } from "../src/utils/spotify"
import { useNavigate } from "react-router-dom"
import SliderCom from "@/component/SliderCom"


const Dashboard = ({token , setPodcastData  , setPodcastID} : PodcastProps & {token : string}) => {
  
  const [Data , setData] = useState([])
  const [codPodcast , setCodPodcast] = useState([])
  const [footBall , setFootBall] = useState([])
  const [relegion , setRelegion] = useState([])
  const navigate = useNavigate()
  
  useEffect(()=>{
    async function FetchData(){
      await APIController().getSearch('arabic podcasts', token , 'show',10).then((data)=>{
        const {shows : {items}} = data
        setData(items)
      })
      await APIController().getSearch('javascript' , token , 'show',10).then((data)=>{
        const {shows : {items}} = data
        setCodPodcast(items)
      })
      await APIController().getSearch('Football', token , 'show' , 10).then((data)=>{
        const {shows : {items}} = data
        setFootBall(items)
      })
      await APIController().getSearch('relegion' , token , 'show' , 10).then((data)=>{
        const {shows : {items}} = data
        setRelegion(items)
      })

    }

    FetchData()
  },[token])

  function handleClick(Value:podcastdata){
    setPodcastID(Value.id)
    if(setPodcastData){
      setPodcastData(Value)
    }
    navigate(`/podcast/${Value.id}`)
  }


  return (
    <section className=" dashboard flex flex-col  w-full">
      <h1 className=" text-white-2  text-2xl  font-bold mb-6">Top arab podcasts 2024</h1>
      <SliderCom value = {Data as any} handleClick = {handleClick}/>
      <section className=" mt-16">
        <h1 className="text-white-2  text-2xl  font-bold mb-6 w-full">Coding Podcasts</h1>
        <SliderCom value={codPodcast} handleClick={handleClick} />
      </section>
      <div className=" mt-16">
        <h1 className=" text-white-2  text-2xl  font-bold mb-6 w-full">Top Football podcasts</h1>
        <SliderCom value={footBall} handleClick={handleClick} />
      </div>
      <div className=" mt-16">
        <h1 className=" text-white-2  text-2xl  font-bold mb-6 w-full">Relegious Podcasts</h1>
        <SliderCom value={relegion} handleClick={handleClick}/>
      </div>
    </section>
  )
}

export default Dashboard