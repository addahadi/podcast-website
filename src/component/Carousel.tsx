import  { useCallback } from 'react'
import {  EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from '../component/EmblaCarouselDotButton'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { Loader } from 'rsuite'
import { podcastdata } from '../utils/type'
import { useNavigate} from 'react-router-dom'

const EmblaCarousel = ( {fansLikeDetail , setPodcastData } : {fansLikeDetail : podcastdata[] , setPodcastData : React.Dispatch<React.SetStateAction<podcastdata | undefined>>}) => {
  const navigate = useNavigate()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay || !("stopOnInteraction" in autoplay.options)) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? (autoplay.reset as () => void)
        : (autoplay.stop as () => void)

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  const slides = fansLikeDetail && fansLikeDetail?.filter((item: any) => item.imgURL != undefined || null)

  if(!slides) return <Loader color="white"  content="generating"  size="md" speed="slow" />

  return (
    <section className="flex w-full flex-col gap-4 overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {slides.slice(0, 5).map((item) => (
          <figure
            key={item.id}
            className="carousel_box"
            onClick={() => {
              navigate(`/podcast/${item.id}`)
              setPodcastData(item)
            }}
          >
            <img
            src={item.imgURL}
            alt="card"
            className="absolute size-full rounded-xl border-none"
            />
            <div className="glassmorphism-black relative z-10 flex flex-col rounded-b-xl p-4">
              <h2 className="text-14 font-semibold text-white-1">{item.podcastName}</h2>
            </div>
          </figure>
        ))}
      </div>
      <div className="flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            selected={index === selectedIndex}
            />
          ))}
      </div>
    </section>
  )
}

export default EmblaCarousel