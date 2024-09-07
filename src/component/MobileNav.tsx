
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Link } from "react-router-dom"
import { sidebarLinks } from "@/utils/utils"
import { useNavigate } from "react-router-dom"
import { useState , useEffect } from "react"
import { useUser } from "./context"
import { signOut } from "firebase/auth"
import { Auth } from "@/utils/fireConfig"

const MobileNav = () => {
    const [ishr , setishr] = useState("Home")
    const [sign , setSign] = useState(false)
    const navigate = useNavigate()
    const {currentuser , setColor , color} = useUser()
    useEffect(()=>{
      if(currentuser){
        setSign(false)
      } else setSign(true)
    },[currentuser])

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
      <section>
        <Sheet>
          <SheetTrigger>
            <img src="/icons/hamburger.svg" width={30} height={30} alt="menu" className="cursor-pointer" />
          </SheetTrigger>
          <SheetContent side="left" className="border-none bg-black-1">
            <Link to="/" className="flex cursor-pointer items-center gap-1 pb-10 pl-4">
              <img src="/icons/podcast-logo.svg" alt="logo" width={40} height={35} />
              <h1 className="text-24 font-extrabold  text-white-1 ml-2">Pod-Dz</h1>
            </Link>
            <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
              <SheetClose asChild>
                <nav className="flex h-full flex-col gap-6 text-white-1">
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
                )})}
                </nav>
              </SheetClose>
              <SheetClose asChild>
                <button className="w-fit p-3  rounded-sm  mb-8 px-10 text-center text-white-1 font-bold mt-20 "
                  style={{backgroundColor:color}}
                  onClick={handleClick}>
                      {!sign ? "SignOut" : "SignIn"}
                  </button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </section>
    )
  }
  
  export default MobileNav