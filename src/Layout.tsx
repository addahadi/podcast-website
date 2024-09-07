
import { useLocation } from 'react-router-dom';
import Leftside from './component/Leftside';
import Rightside from './component/Rightside';
import {ComponentProps} from "./utils/type"
import { useUser } from './component/context';
import AudioPlayer from './component/AudioPlayer';
import MobileNav from './component/MobileNav';
const Layout = ({Children}:ComponentProps) => {
  const location = useLocation();
  const showLeftside = location.pathname !== '/signin'
  const showAudio = location.pathname !== '/createpodcast'
  const {currentuser , color , setColor , setPodcastData} = useUser()
  return (
    <>
      <div className="flex relative flex-row">
        {showLeftside && location.pathname !== '/signin' && <Leftside User = {currentuser} color={color} setColor={setColor} />}
        
        <section className="dashboard overflow-y-auto box-border flex-1 h-screen p-8 max-sm:px-4">
          <div className='flex items-center justify-between md:hidden mb-10'>
            <img src="../public/icons/podcast-logo.svg" width={50} height={50} className=''></img>
            <MobileNav />
          </div>
          {Children}
        </section>
        
        {showLeftside && location.pathname !== '/signin' && <Rightside setPodcastData={setPodcastData} User = {currentuser} color={color} />}
      </div>
      {showAudio && <AudioPlayer/>}
    </>
  );
};

export default Layout;