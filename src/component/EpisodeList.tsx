import { EpisodeData } from '../utils/type'
import { msToTime } from '../utils/utils'

const EpisodeList = ({value}:{value:EpisodeData}) => {
  return (
    <div className='hover:bg-red-1'>
      <section className='flex flex-row gap-3 p-6 border-t-2  border-white-4 cursor-pointer 
       '>
          <div>
              <img src={value.imgURL} className='rounded-sm w-[100px] h-[100px]' />            
          </div>
          <div className='flex flex-col gap-2'>
              <h1 className='text-lg font-bold text-white-1'>{value.podcastName}</h1>
              <p className=' text-sm font-extrabold text-white-2'>{value.author}</p>
          </div>
      </section>
      <div className='p-6 -mt-6'>
        <p className='text-white-2'><span>...</span>{value.podcastDesc}</p>
        <p className='text-white-1 font-bold felx flex-row gap-2'>
            <span className=' mr-2'>{value.date}</span>.
            <span className='ml-2'>{msToTime(value.duration)}</span>
        </p>
      </div>

    </div>
  )
}

export default EpisodeList