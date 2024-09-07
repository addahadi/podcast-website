import { useEffect,useState } from "react";
import { UserState } from "../utils/type";

import { database } from "../utils/fireConfig";
import firebase from "firebase/compat/app";

export function GetUsers(User : UserState){
    const [Data , setData]= useState<firebase.firestore.DocumentData[]>([])
    useEffect(() => {
      async function FetchData() {
        try{
            const users = database.collection('user').get()
            const docs : firebase.firestore.DocumentData[] = []
            ;(await users).docs.forEach((doc)=>{
                docs.push(doc.data())
            })
            setData(docs)
        }
        catch(error){
          console.log(error)
        }
      }
      FetchData();
  }, [User]);
    return Data
}
export function GetDocs(User : UserState){
    const [Data , setData] = useState<firebase.firestore.DocumentData[]>([])
    useEffect(() => {
        async function fetchDocuments() {
          if (!User?.email) return;
          try {
            const docsCollectionRef = database.collection("users").doc(User.email).collection('podcasts');
            const querySnapshot = await docsCollectionRef.get();
            const documents: firebase.firestore.DocumentData[] = [];
            querySnapshot.forEach((doc) => {
              documents.push({id: doc.id, ...doc.data()});
            });
            setData(documents);
          } catch (error) {
            console.error("Error fetching documents: ", error);
          }
        }
        fetchDocuments();
      }, [User]);
    return Data
}