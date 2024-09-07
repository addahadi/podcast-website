
import PodcastCard from './PodcastCard'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SliderProps as Slide } from '@/utils/type';
import Slider from "react-slick";
import { useMediaQuery } from 'rsuite';



function NextArrow(){
  return <div></div>
}
function PrevArrow(){
  return <div>

  </div>
}
const SliderCom = ({value , handleClick} : Slide) => {
  const settings = {
    speed: 500,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive:[      
      {
        breakpoint:1024,
        settings:{
          slidesToShow:3,
          slidesToScroll: 1,

        },
      },
      {
        breakpoint:1900,
        settings:{
          slidesToShow:3,
          slidesToScroll: 1,

        }
      },
      {
        breakpoint:2050,
        settings:{
          slidesToShow:4,
          slidesToScroll: 1,

        }
      },
      {
        breakpoint:2560,
        settings:{
          slidesToShow:5,
          slidesToScroll: 1,
  
        }
      },
      {
        breakpoint:600,
        settings:{
          slidesToShow:2,
          slidesToScroll: 2,
  
        }
      },
      {
        breakpoint:500,
        settings:{
          slidesToShow:1,
          slidesToScroll: 1,
  
        }
      }

    ]
  }
  return (
    <Slider 
    {...settings}
    >
        {value.map((value : any,index)=>{
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
          <div className=' w-full'>
            <PodcastCard key={index} value={Value} handleClick={() => handleClick(Value)} /> 
          </div>
          ) 
        })}
    </Slider>
  )
}

export default SliderCom
