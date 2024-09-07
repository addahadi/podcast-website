
import { EpisodeData, PodcastProps, podcastdata, ViewProps } from '../src/utils/type';
import PodcastCard from '../src/component/PodcastCard';
import { useEpisodes, usePodcasts } from '../src/component/customCom';
import EpisodeList from '../src/component/EpisodeList';
import { useAudio } from '@/component/context';

const PodcastPage = ({ setView, User, podcastData, setPodcastID, setPodcastData, token }: PodcastProps & ViewProps & { token: string }) => {
  // Always call both hooks, but use conditional logic inside the hooks or in the render phase
  if(!podcastData?.id) return 
  const spotifyData = useEpisodes(token, podcastData?.id);
  const nonSpotifyData = usePodcasts({ User, setPodcastID, setPodcastData, setView });

  // Determine which data to use based on podcast source
  const { Data, handleClick } = podcastData?.spotify ? spotifyData : nonSpotifyData;

  const { audio, setAudio } = useAudio();

  function render() {
    if (!podcastData || podcastData?.spotify) return;
    if (!User?.email) return;

    setAudio({
      podcastName: podcastData.podcastName,
      author: User?.email?.split('@')[0],
      imgURL: podcastData.imgURL,
      audioURL: podcastData.audioURL,
      id: podcastData.id
    });
  }

  return (
    <section className="flex flex-col gap-8">
      <header className="flex flex-row justify-between items-center">
        <h1 className="text-white-2 text-2xl font-bold">Currently Playing</h1>
        <p className="flex flex-row gap-2 text-white-1 text-lg">
          {podcastData?.view}
          <img src="../public/icons/headphone.svg"/>
        </p>
      </header>
      <div className="flex flex-row gap-8 max-sm:flex-col max-sm:justify-center max-sm:items-center">
        <img src={podcastData?.imgURL} width={250} className="rounded max-sm:w-[300px]" />
        <section className="flex flex-col gap-14 max-sm:gap-4">
          <h3 className="text-white-1 flex flex-row gap-2 items-center sm:-mb-11 font-bold text-[15px] max-sm:-mb-2">
            <img src="../public/icons/verified.svg" width={20} height={20} />
            <span>{podcastData?.author}</span>
          </h3>
          <h1  className= "lg:leading-loose text-white-2 max-xl:text-6xl  font-extrabold sm:text-3xl max-sm:text-2xl" style={{lineHeight:"40px"}}>{podcastData?.podcastName.slice(0, 40)}</h1>
          <button
            onClick={render}
            className="bg-red-1 p-5 rounded-sm max-w-fit h-12 font-bold text-white-1 flex flex-row gap-2 items-center justify-center hover:border hover:text-white-1 hover:border-red-1 hover:bg-[#000] transition ease delay-100"
          >
            <img src="../public/icons/watch.svg" width={25} height={25} />
            Run The Podcast
          </button>
        </section>
      </div>
        <span className=' ml-auto  mr-auto w-full h-1 bg-black-5 rounded-sm m-10'></span>
      <main className="flex flex-col gap-6">
        <h1 className="text-white-2 text-2xl font-bold mt-2">Transcription</h1>
        <p className="text-white-2 ml-4">{podcastData?.podcastDesc}</p>
      </main>
      <footer className="">
        <h1 className="text-white-2 text-2xl font-bold mt-8 mb-8">{podcastData?.spotify ? 'Episodes' : 'Similar Podcasts'}</h1>
        {!podcastData?.spotify ? (
          <div className="podcastgrid mt-8">
            {Data.map((value, index) => (
              <PodcastCard key={index} value={value as podcastdata} handleClick={handleClick} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            {Data.map((value: any, index) => {
              const { description, images, name, release_date, duration_ms } = value;
              const Value: EpisodeData = {
                podcastName: name,
                podcastDesc: description.substring(0, 100),
                imgURL: images[1].url,
                date: release_date,
                duration: duration_ms,
                author: podcastData.author
              };

              return <EpisodeList key={index} value={Value} />;
            })}
          </div>
        )}
      </footer>
    </section>
  );
};

export default PodcastPage;