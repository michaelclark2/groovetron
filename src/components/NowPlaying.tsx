import { Station } from "radio-browser-api";
import { MouseEventHandler, ReactElement, useEffect, useState } from "react";
import PlayButton from "./PlayButton";
import VolumeControls from "./VolumeControls";
import {
  IconCaretDown,
  IconCaretUp,
  IconDeviceFloppy,
  IconHome,
  IconSettings,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";

import { usePlayer } from "../context/PlayerContext";
import Marquee from "react-fast-marquee";
import { useUserData } from "../context/UserContext";

function StationTitle({ station }: { station: Station }) {
  return <h2 className="text-xl sm:text-2xl font-bold">{station?.name}</h2>;
}

export default function NowPlaying() {
  const { userData, addToFaves, removeFromFaves, addToSongs } = useUserData();
  const { nowPlaying, songPlaying } = usePlayer();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [shouldMarquee, setShouldMarquee] = useState(false);

  useEffect(() => {
    if (nowPlaying.name) {
      document.title =
        "Radio" + (nowPlaying?.name ? ": " + nowPlaying.name : "");
    }
  }, [nowPlaying.name]);

  const getCurrentlyPlayingElement = () =>
    document.getElementById("currentTrack")!;

  const isStationInFavs = userData?.favs?.some(
    (fav: Station) => fav.id === nowPlaying.id
  );

  useEffect(() => {
    const currentTrack = getCurrentlyPlayingElement();
    setShouldMarquee(
      currentTrack?.scrollWidth > currentTrack?.closest(".w-full")!.scrollWidth
    );
  }, [songPlaying]);

  const handleSaveSong = () => {
    const song = {
      track: songPlaying,
      station: nowPlaying,
      timestamp: Date.now(),
    };
    addToSongs(song);
  };

  const handleFavStation = () => {
    isStationInFavs ? removeFromFaves(nowPlaying.id) : addToFaves(nowPlaying);
  };

  const handleHomePage = () => {
    window.open(nowPlaying.homepage, "__blank");
  };

  const handleSettings = () => {
    console.log("settings");
  };

  const renderOptions = () => {
    return options.map((options) => {
      const icon = options[0] as ReactElement;
      const action = options[1] as MouseEventHandler;
      return (
        <button
          onClick={action}
          className="bg-slate-100 rounded-full p-1 mx-1 mb-3 flex justify-center items-center w-[30px] h-[30px]"
        >
          {icon}
        </button>
      );
    });
  };

  const options = [
    [<IconDeviceFloppy />, handleSaveSong],
    [isStationInFavs ? <IconStarFilled /> : <IconStar />, handleFavStation],
    [<IconHome />, handleHomePage],
    [<IconSettings />, handleSettings],
  ];

  if (Object.keys(nowPlaying).length === 0) return;
  return (
    <div className="my-5 mx-auto truncate">
      <div className="p-4 rounded-xl flex bg-slate-300 flex-col">
        <div className="flex items-start justify-between">
          <div className="flex justify-center mr-4">
            <PlayButton size={40} />
          </div>
          <div className="w-full overflow-hidden">
            <StationTitle station={nowPlaying} />
            {songPlaying && (
              <Marquee
                speed={30}
                delay={5}
                pauseOnHover
                className="gap-2"
                play={shouldMarquee}
                loop={shouldMarquee ? 0 : 1}
                onMount={() => {
                  const currentTrack = getCurrentlyPlayingElement();
                  setShouldMarquee(
                    currentTrack?.scrollWidth >
                      currentTrack?.closest(".w-full")!.scrollWidth
                  );
                }}
              >
                <p id="currentTrack" className="overflow-hidden">
                  {songPlaying}
                </p>
              </Marquee>
            )}
          </div>
          <button
            className="bg-slate-200 rounded-full sm:hidden"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <IconCaretDown /> : <IconCaretUp />}
          </button>
          <div className="hidden sm:flex flex-col justify-between">
            <div className="flex justify-between">{renderOptions()}</div>
            <VolumeControls />
          </div>
        </div>
        {isCollapsed ? null : (
          <div className="mt-4 sm:hidden">
            <div className="flex">
              <div className="w-1/2 flex">{renderOptions()}</div>
              <div className="w-1/2">
                <VolumeControls />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
