
import './App.css'
import { Routes , Route,} from 'react-router-dom'
import Dashboard from  "../app/Dashboard"
import Discover from "../app/Discover"
import {Auth , app, database} from "./utils/fireConfig"
import { useEffect, useState } from 'react'
import { podcastdata, UserState } from './utils/type'
import SignIn from "../app/SignIn"
import PrivateRoute from './component/PrivateRoute'
import Layout from './Layout'
import Profile from "../app/Profile"
import PodcastPage from "../app/PodcastPage"
import { APIController } from './utils/spotify'
import { AudioProvider, UserProvider } from './component/context'
import { Toaster } from './components/ui/toaster'
import Podcast from "../app/Podcast"
function App() {
  
  const [currentuser , setCurrentuser] = useState<UserState>(null)
  const [token , setToken] = useState<string>('')
  const [podcastID , setPodcastID] = useState('')
  const [podcastData , setPodcastData] = useState<podcastdata | undefined>()
  const [view , setView] = useState<number>(0)
  useEffect(()=>{
    async function FetchData(){
      await APIController().getToken().then((data)=>{
        console.log("successed")
        setToken(data)
      })

    }
    FetchData()
  },[])

  useEffect(()=>{  
    const unsb = Auth.onAuthStateChanged((user)=>{
      setCurrentuser(user)
    })
    async function setDocs(){
      if(currentuser?.email){
        const docs = await database.collection('user').doc(currentuser?.email).get()
        if(!docs.exists){
          await database.collection('user').doc(currentuser.email).set({
            name:currentuser.email.split('@')[0],
            img:currentuser.photoURL,
            podcastsNumber: (await database.collection('users').doc(currentuser.email).collection('podcasts').get()).size
          })
        }
      }
    }
    setDocs()
    return () => unsb()
  },[Auth,currentuser])
  return (
    <AudioProvider >
    <UserProvider setPodcastData = {setPodcastData} currentuser={currentuser} setCurrentuser={setCurrentuser}>
        <Toaster/>
        <Routes>

            <Route 
              path="/" 
              element={
                <Layout Children={
                  <Dashboard setPodcastID={setPodcastID}  token = {token} setPodcastData = {setPodcastData} podcastData = {podcastData} />
                }/>
              } 
            />
            <Route 
              path="/discover" 
              element={
                <Layout Children={
                  <Discover token={token}   setPodcastData={setPodcastData} setPodcastID={setPodcastID}/>
                }/>
              } 
            />
            <Route 
              path="/createpodcast" 
              element={
                <Layout Children={
                  <PrivateRoute Children = {<Podcast User={currentuser} setPodcastID={setPodcastID} setPodcastData={setPodcastData}/>} User={currentuser} />
                }/>
              } 
            />
            <Route 
              path="/signin" 
              element={<SignIn />} 
            />
            <Route
            path='/profile'
            element={<Layout Children= {
              <PrivateRoute Children={ <Profile 
                view={view} 
                setView={setView}  
                User={currentuser} 
                setPodcastID = {setPodcastID} 
                setPodcastData = {setPodcastData} />} User={currentuser}/>} />}
            />
            <Route 
              path="/podcast/:id" 
              element={
                <Layout  Children={
                  <PodcastPage 
                    token={token}
                    view={view} 
                    setView={setView} 
                    podcastData = {podcastData} 
                    setPodcastID = {setPodcastID} 
                    User={currentuser} 
                    setPodcastData={setPodcastData} />


                } />
              } 
            />
        </Routes>
      </UserProvider>
    </AudioProvider>
    )
}

export default App
