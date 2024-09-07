import { Link, useNavigate } from "react-router-dom"
import { sidebarLinks} from "../utils/utils"
import { useEffect, useState } from "react"
import { ColorProps, UserState } from "../utils/type"
import { Auth } from "@/utils/fireConfig"
import { signOut } from "firebase/auth"

const Leftside = ({color , setColor , User}:ColorProps & {User:UserState}) => {
  const [ishr , setishr] = useState("Home")
  const [sign , setSign] = useState(false)
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(User){
      setSign(false)
    } else setSign(true)
  },[User])
  async function handleClick(){
    if(!sign){
      await signOut(Auth).then(()=>{
        navigate("/")
      })
    }
    else {
      navigate("/signin")
    }

  }
  
  return (
    <section className="left_sidebar bg-black-2">
        <nav className="flex flex-col gap-5">
          <Link to="/" className="flex cursor-pointer items-center pb-5 
          ">
            <img src="../public/icons/podcast-logo.svg" width={50} height={50}/>
            <h1 className=" text-xl text-white-1 font-bold">Pod_Dz</h1>
          </Link>
          {sidebarLinks.map((value, index )=>{
            return (
              <Link to={value.route} key={index}>
                <div onClick={()=> { setishr(value.label); setColor(value.color)}} className=" flex  flex-row-reverse gap-4  items-center  
                w-15 justify-end  py-4  active:bg-black-5 h-auto
                " style={{borderRight: ishr === value.label ?  `5px solid ${value.color}`: "", background:ishr === value.label ? "linear-gradient(270deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.00) 100%)": ""}}>
                  <span className=" text-white-4 font-bold flex-1">{value.label}</span>
                  <img src={value.imgURL} width={25} height={25}/> 
                </div>
              </Link>
            )
          })}
        </nav>
        <div className=" relative">
          <button className="w-fit p-3  rounded-sm  mb-8 px-10 text-center text-white-1 font-bold " style={{backgroundColor:color,
          position:"absolute",
          left:"50%",
          bottom:"60px",
          transform:"translate(-60%)",
          
          }} onClick={handleClick}>
            {!sign ? "SignOut" : "SignIn"}
          </button>
        </div>
    </section>
      
  )
}

export default Leftside