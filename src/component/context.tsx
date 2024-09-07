import React, { createContext, useContext, useState } from 'react';
import { AudioProps, ColorProps, podcastdata, UserContextProps } from '../utils/type';
const UserContext = createContext<UserContextProps & ColorProps & any | undefined>(undefined);
const AudioContext = createContext<AudioProps|undefined>(undefined)
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};


export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const AudioProvider = ({children} : {children : JSX.Element}) => {
  const [audio , setAudio] = useState<podcastdata|undefined>()  
  return (
    <AudioContext.Provider value = {{audio , setAudio}}>
      {children}
    </AudioContext.Provider>
  )
}


export const UserProvider = ({ children , setPodcastData  , currentuser , setCurrentuser } : UserContextProps & {children : React.ReactNode} &
  {setPodcastData:React.Dispatch<React.SetStateAction<podcastdata | undefined>>}
)  => { 
  const [color , setColor] = useState<string>('#22a12a')
  return (
    <UserContext.Provider value={{ currentuser, setCurrentuser,color , setColor, setPodcastData }}>
      {children}
    </UserContext.Provider>
  );
};