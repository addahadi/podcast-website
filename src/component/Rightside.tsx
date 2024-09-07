import { Link } from "react-router-dom"
import  Carousel  from "../component/Carousel"
import { podcastdata, UserState } from "../utils/type"
import { GetDocs, GetUsers } from "./getDocs"

const Rightside = ({User , color , setPodcastData} : {User:UserState, color: string , setPodcastData : React.Dispatch<React.SetStateAction<podcastdata | undefined>>}) => {
  let Data : podcastdata[] = []
  let Users : any= []
  Data = GetDocs(User) as podcastdata[] ;
  Users = GetUsers(User)
  return (
    <div className="right_sidebar">
      <div className="flex flex-col gap-5">
        <header className="flex flex-row gap-4 items-center">
          <img src={User?.photoURL ? User?.photoURL  : ""} width={40} height={40} className=" rounded-full" />
          <p className=" flex-1 text-white-1 font-bold ">{User?.displayName}</p>
          <img src='../public/icons/right-arrow.svg' width={20} height={20} />
        </header>
        <main>
          <h1 className="flex flex-row justify-between items-center">
            <span className=" text-white-1 font-bold text-[14px]">Your Generated Podcasts</span>
            <Link to='/profile' style={{textDecoration:"none",outline:"none"}}>
              <span className="font-bold text-sm" style={{color:color && color}}>See all</span>
            </Link>
          </h1>
          <Carousel fansLikeDetail = {Data} setPodcastData={setPodcastData} />
        </main>
        <footer>
          <h1 className="text-white-1 font-bold text-[14px]">Top Podcasters in AI-Gen-Pods</h1>
          <div className="flex flex-col gap-4">
            {Users.slice(0,3).map((value:any)=>{
              return (
                <div className="flex flex-row gap-3 items-center">
                  <img src={value.img}  className="rounded-md h-10 "/>
                  <div className="flex flex-col flex-1">
                    <div className=" text-white-1">{value.name}</div>
                    <div className=" text-white-2">{value.name.slice(0,6)}</div>
                  </div>
                  <p className=" text-white-1 " >{value.podcastsNumber} podcasts</p>
                </div>
              )
            })}          
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Rightside