import { PodcastProps, podcastdata, ViewProps} from '../src/utils/type'
import SignIn from './SignIn'
import PodcastCard from '../src/component/PodcastCard';
import { usePodcasts } from '../src/component/customCom';
const Profile = ({User , setPodcastID , setPodcastData , setView} : PodcastProps & ViewProps) => {
  const {Data , handleClick} = usePodcasts({User , setPodcastData , setPodcastID , setView})

  if(!User) return <SignIn/>
  return (
    <section className=" flex flex-col gap-8">
      <h1 className='text-2xl text-white-2 font-bold'>Podcaster Profile</h1>
      <div className="flex flex-row gap-8">
        <img src={User?.photoURL ? User.photoURL : ""} width={250} className='rounded' />
        <section className='flex flex-col gap-7'>
          <h3 className='text-white-2 flex flex-row gap-2 items-center font-bold text-sm'>
            <img src="../public/icons/verified.svg" width={20} height={20} />
            <span>Verfied Creator</span>
          </h3>
          <h1 className='text-white-1 text-2xl font-bold'>{User.email?.split('@')[0]}</h1>
          <h2 className='flex flex-row items-center  gap-2 h-10'>
            <img src="../public/icons/headphone.svg" width={20} className=' h-5' />
            <span className='text-white-1 font-bold text-sm'> 93,525,192<span className='text-white-3 ml-1'>mounthly listners</span></span>
          </h2>
          <button className=' bg-mouve-1  p-5 rounded-sm max-w-60 h-12 font-bold text-white-1 flex flex-row gap-2 items-center justify-center
          hover:border hover:text-white-1 hover:border-mouve-1 hover:bg-[#000] transition ease delay-100
          '>
            <img src="../public/icons/watch.svg" width={25} height={25} />
            Play random Podcast
          </button>
        </section>
      </div>
      <section>
        <div className='flex flex-row justify-between items-center'>
          <h1 className='text-xl text-white-2 font-bold'>All Podcasts</h1>
          <button className='flex flex-row gap-2 items-center bg-mouve-1 p-2 text-white-1 font-bold
          hover:border hover:text-white-1 hover:border-mouve-1 hover:bg-[#000] transition ease delay-100
          '>
            <img src="../public/icons/edit.svg" />
            Apply filter
          </button>
        </div>
        <div className='podcastgrid mt-8 '>
          
          {Data.map((value , index)=>{

            return (
              <PodcastCard key={index} handleClick={handleClick} value={value as podcastdata} />)
          })}
        </div>
      </section>
    </section>
  )
}

export default Profile