import { toast } from "@/hooks/use-toast";


interface items {
    imgURL:string,
    route:string,
    label:string,
    color:string
}
export const sidebarLinks : items[] = [
  {
    imgURL: "../public/icons/home.svg",
    route: "/",
    label: "Home",
    color :'#22a12a',

  },
  {
    imgURL: "../public/icons/discover.svg",
    route: "/discover",
    label: "Discover",
    color :'#fa8900',
  },
  {
    imgURL: "../public/icons/microphone.svg",
    route: "/createpodcast",
    label: "Create Podcast",
    color :'#ef4444',
  },
  {
    imgURL :"../public/icons/profile.svg",
    route:"/profile",
    label:"Profile",
    color :'#7d06a2',
  },
];
  
export const podcastData = [
  {
    id: 1,
    title: "The Joe Rogan Experience",
    description: "A long form, in-depth conversation",
    imgURL:
      "https://lovely-flamingo-139.convex.cloud/api/storage/3106b884-548d-4ba0-a179-785901f69806",
  },
  {
    id: 2,
    title: "The Futur",
    description: "This is how the news should sound",
    imgURL:
      "https://lovely-flamingo-139.convex.cloud/api/storage/16fbf9bd-d800-42bc-ac95-d5a586447bf6",
  },
  {
    id: 3,
    title: "Waveform",
    description: "Join Michelle Obama in conversation",
    imgURL:
      "https://lovely-flamingo-139.convex.cloud/api/storage/60f0c1d9-f2ac-4a96-9178-f01d78fa3733",
  },
  {
    id: 4,
    title: "The Tech Talks Daily Podcast",
    description: "This is how the news should sound",
    imgURL:
      "https://lovely-flamingo-139.convex.cloud/api/storage/5ba7ed1b-88b4-4c32-8d71-270f1c502445",
  },
  {
    id: 5,
    title: "GaryVee Audio Experience",
    description: "A long form, in-depth conversation",
    imgURL:
      "https://lovely-flamingo-139.convex.cloud/api/storage/ca7cb1a6-4919-4b2c-a73e-279a79ac6d23",
  },
  {
    id: 6,
    title: "Syntax ",
    description: "Join Michelle Obama in conversation",
    imgURL:
      "https://lovely-flamingo-139.convex.cloud/api/storage/b8ea40c7-aafb-401a-9129-73c515a73ab5",
  },
  {
    id: 7,
    title: "IMPAULSIVE",
    description: "A long form, in-depth conversation",
    imgURL:
      "https://lovely-flamingo-139.convex.cloud/api/storage/8a55d662-fe3f-4bcf-b78b-3b2f3d3def5c",
  },
  {
    id: 8,
    title: "Ted Tech",
    description: "This is how the news should sound",
    imgURL:
      "https://lovely-flamingo-139.convex.cloud/api/storage/221ee4bd-435f-42c3-8e98-4a001e0d806e",
  },
];

export const podcastCategoriesWithIds = [
  { id: "0C8ZxZ4E1MZk1kB2GmZzFp", name: "Arts" },
  { id: "0C8ZxZ4E1MZk1kB2GmZzFq", name: "Business" },
  { id: "0C8ZxZ4E1MZk1kB2GmZzFr", name: "Comedy" },
  { id: "0C8ZxZ4E1MZk1kB2GmZzFs", name: "Education" },
  { id: "0C8ZxZ4E1MZk1kB2GmZzFt", name: "Health & Fitness" },
  { id: "0C8ZxZ4E1MZk1kB2GmZzFu", name: "Kids & Family" },
  { id: "0C8ZxZ4E1MZk1kB2GmZzFv", name: "Leisure" },
  { id: "0C8ZxZ4E1MZk1kB2GmZzFw", name: "Music" },
  { id: "0C8ZxZ4E1MZk1kB2GmZzFx", name: "News" },
  { id: "0C8ZxZ4E1MZk1kB2GmZzFy", name: "Religion & Spirituality" },
  { id: "0C8ZxZ4E1MZk1kB2GmZzFz", name: "Science" },
  { id: "0C8ZxZ4E1MZk1kB2GmZzG0", name: "Society & Culture" },
  { id: "0C8ZxZ4E1MZk1kB2GmZzG1", name: "Sports" },
  { id: "0C8ZxZ4E1MZk1kB2GmZzG2", name: "Technology" },
  { id: "0C8ZxZ4E1MZk1kB2GmZzG3", name: "True Crime" },
  { id: "0C8ZxZ4E1MZk1kB2GmZzG4", name: "TV & Film" }
];


export function msToTime(duration: number): string {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  return `${hours}h ${minutes}m ${seconds}s`;
}

export const LostCom = {
  fillName:'fillname',
  fillSelect : 'fillselect',
  fillDesc : "filldesc",
  fillText : "filltext",
  fillImg : "fillimg"  

}

export function  ThrowError(inputs:any) {
  const errors = []
  for(let input in inputs){
    if(!inputs[input]){
      errors.push(input)
    }
  }
  switch(errors.length){
    case 0 :
      return true
    case 1 : 
      toast({
        title:"Error occur",
        description : `you have not fill in ${errors[0]} `,
        variant:"destructive"
      })
      return false
    default :
      toast({
        title:"Error occur",
        description:"you have not fill in the  inputs",
        variant:"destructive",
      })
      return false 

  }
}



export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};


export const spotifySquareColors = [
  '#8B5E3C', // Beauty
  '#326D4E', // Fashion
  '#497C5C', // Fitness & Nutrition
  '#8A8A8A', // Food
  '#1D7A1D', // Health
  '#D12323', // Hobbies
  '#293A6B', // Lifestyle
  '#7F1A2C', // Meditation Podcasts
  '#2B75D7', // Parenting
  '#8A5E3B', // Relationships
  '#BB7325', // Self-care
  '#9A4C96',  // Sex
  '#8B5E3C', // Beauty
  '#326D4E', // Fashion
  '#497C5C', // Fitness & Nutrition
  '#8A8A8A', // Food
];