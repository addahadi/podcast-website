import { User } from 'firebase/auth';

// User-related types
export type UserState = User | null;

export interface UserProps {
    User: UserState | undefined;
}

export interface UserContextProps {
    currentuser: UserState;
    setCurrentuser: React.Dispatch<React.SetStateAction<UserState>>;
}

// Voice-related types
export interface VoiceObj {
    name?: string;
    voice_id?: string;
}

export type Voice = VoiceObj[];

// Podcast-related types
export interface podcastdata {
    imgURL: string;
    audioURL?: string;
    id: string;
    podcastName: string;
    podcastDesc?: string;
    author: string;
    view?: number;
    spotify?: boolean;
}

export interface EpisodeData {
    imgURL: string;
    podcastName: string;
    podcastDesc?: string;
    date: string;
    duration: number;
    author: string;
}

export interface PodcastProps {
    podcastData?: podcastdata;
    User?: UserState;
    setPodcastID: React.Dispatch<React.SetStateAction<string>>;
    setPodcastData?: React.Dispatch<React.SetStateAction<podcastdata | undefined>>;
}

export interface PodcastCardProps<T extends podcastdata> {
    handleClick: (arg: T) => void;
    value: T;
}

export interface SliderProps {
    handleClick: (arg: podcastdata) => void;
    value: podcastdata[];
}

// Component-related types
export interface GenerateTxtProps extends UserProps {
    setSpeech: React.Dispatch<React.SetStateAction<string>>;
    setText: React.Dispatch<React.SetStateAction<string>>;
    voice?: string;
    text: string;
    speech: string;
}

export interface GenerateImageProps {
    imgUrl: string | ArrayBuffer | null;
    text: string;
    setImgUrl: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
}

export interface ComponentProps {
    Children: JSX.Element;
}

// Miscellaneous types
export interface ColorProps {
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>;
}

export interface ViewProps {
    view?: number;
    setView: React.Dispatch<React.SetStateAction<number>>;
}



// audio props
export interface AudioProps {
    audio : podcastdata |undefined
    setAudio : React.Dispatch<React.SetStateAction<podcastdata |undefined>>
}