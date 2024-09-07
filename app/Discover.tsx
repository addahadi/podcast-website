import { APIController } from "@/utils/spotify"
import { useState } from "react"
import PodcastCard from "@/component/PodcastCard"
import { useNavigate } from "react-router-dom"
import { podcastdata, PodcastProps } from "@/utils/type"
import { Loader } from "rsuite"

const Discover = ({token,setPodcastData , setPodcastID} : PodcastProps & {token : string}) => {
  const [search , setSearch] = useState('')
  const [shows , setShows] = useState([])
  const navigate = useNavigate()
  const [loading , setloading] = useState<boolean>(false)
  async function Search(){
    setloading(true)
    if(!search) return 
    await APIController().getSearch(search,token,"show",10).then((data)=>{
      const {shows : {items}} = data
      setShows(items)
      console.log(items)
      setloading(false)
    })
  }
  function handleClick(Value:podcastdata):void{
    if(!Value) return 
    setPodcastID(Value.id)
    if(setPodcastData){
      setPodcastData(Value)
    }
    navigate(`/podcast/${Value.id}`)
  }
  return (
  <section className="flex flex-col relative h-full w-full">
    <h1 className="text-white-2 text-2xl font-bold ">Discover</h1>
    <div className="absolute top-[100px] w-full">
      <div className="flex flex-row justify-center items-center">
        <div className="max-w-[700px] w-[700px] flex flex-row ">
          <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className=" outline-none text-white-1 flex-1 h-14 rounded-sm p-4 bg-black-4" 
          placeholder="search up" />
          <button onClick={Search} className="bg-orange-1 w-28 rounded-sm font-bold 
          text-white-1">Search</button>
        </div>
      </div>  
    </div>
    {!loading ? <main className="absolute top-[200px] left-0 podcastgrid w-full place-items-center">
        {shows.map((value:any,index:number)=>{
          const {id , images , publisher , name , description} = value
          const Value = {
              id : id , 
              imgURL : images[1].url,
              author : publisher,
              podcastName: name,
              podcastDesc: description,
              spotify : true,
            }
            return(
                <PodcastCard key={index}  value={Value} handleClick={() => handleClick(Value)}/>

            )
        })}
    </main> :
     <div className=" absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 ">
      <Loader size="lg" color="white" />
    </div>}
  </section>
  )
}

export default Discover