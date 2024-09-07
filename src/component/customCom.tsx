import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app'; // Ensure this is correctly imported based on your Firebase setup
import { database } from '../utils/fireConfig';
import { PodcastProps, ViewProps } from '../utils/type';
import { useNavigate } from 'react-router-dom';
import { APIController } from '../utils/spotify';

export function useEpisodes(token:string , id  : string){
  const [Data , setData] = useState([])  
  useEffect(()=>{
    async function fetchData(){
      await APIController().getEpisode(token , id).then((data)=>{
        console.log(data)
        const {items} = data
        setData(items)
      })
    }
    fetchData()
  },[token])
  function handleClick(){
    return
  }
  return {Data , handleClick}
}


export function usePodcasts({User , setPodcastID,  setPodcastData,  setView } : PodcastProps & ViewProps ) {
  const [Data, setData] = useState<object[]>([]);
  const navigate = useNavigate()  
  
  useEffect(() => {
    async function fetchDocuments() {
      if (!User?.email) return;
      try {
        const docsCollectionRef = database.collection("users").doc(User.email).collection('podcasts');
        const querySnapshot = await docsCollectionRef.get();
        const documents: firebase.firestore.DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });
        setData(documents);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    }
    fetchDocuments();
  }, [User]);

  const handleClick = async (value: any) => {
    setView(0);
    setPodcastID(value.id);
    
    if (setPodcastData) {
      setPodcastData(value);
    }
    navigate(`/podcast/${value.id}`);
    
    if (!User?.email) return;

    let data = (await database.collection("users").doc(User.email).collection('podcasts').doc(value.id).get()).data();
    console.log(data);
    
    if (data) {
      await database.collection("users").doc(User.email).collection('podcasts').doc(value.id).update({
        view: data.view + 1
      }).then(() => {
        setView(data.view + 1);
      });
    }
  };

  return { Data, handleClick };
}