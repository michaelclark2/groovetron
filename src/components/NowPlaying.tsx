import { Station } from "radio-browser-api";
import { useEffect, useState } from "react";
import PlayButton from "./PlayButton";
import VolumeControls from "./VolumeControls";
import {
  IconDeviceFloppy,
  IconHome,
  IconMusic,
  IconSettings,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";

import { usePlayer } from "../context/PlayerContext";
import Marquee from "react-fast-marquee";
import { useUserData } from "../context/UserContext";

function StationTitle({ station }: { station: Station }) {
  return (
    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
      {station?.name}
    </h2>
  );
}

export default function NowPlaying({
  showBrowser,
  setShowBrowser,
}: {
  showBrowser: boolean;
  setShowBrowser: Function;
}) {
  const { userData, addToFaves, removeFromFaves, addToSongs } = useUserData();
  const { nowPlaying, songPlaying } = usePlayer();
  const [shouldMarquee, setShouldMarquee] = useState(false);

  useEffect(() => {
    if (nowPlaying.name) {
      document.title =
        "Groovetron" + (nowPlaying?.name ? ": " + nowPlaying.name : "");
    }
  }, [nowPlaying.name]);

  const getCurrentlyPlayingElement = () =>
    document.getElementById("currentTrack")!;

  const isStationInFavs = userData?.favs?.some(
    (fav: Station) => fav.id === nowPlaying.id
  );

  useEffect(() => {
    if (songPlaying !== "") checkMarqueeSize();
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

  const handleBrowser = () => {
    setShowBrowser(!showBrowser);
  };

  const handleSettings = () => {
    console.log("settings");
  };

  const renderOptions = () => {
    const baseStyles =
      "rounded-full p-1 flex justify-center items-center border-2 border-black max-w-8 max-h-8 layer-0 ";

    return (
      <>
        <PlayButton className={"bg-primary " + baseStyles} />
        <button
          className={"bg-secondary " + baseStyles}
          onClick={handleSaveSong}
        >
          <IconDeviceFloppy />
        </button>
        <button
          className={"bg-secondary-alt " + baseStyles}
          onClick={handleFavStation}
        >
          {isStationInFavs ? (
            <IconStarFilled className="fill-amber-300 stroke-2 stroke-black" />
          ) : (
            <IconStar />
          )}
        </button>
        <button
          className={"bg-[#A8E6CF] " + baseStyles}
          onClick={handleHomePage}
        >
          <IconHome />
        </button>
        <button
          className={"bg-[#FF85B3] " + baseStyles}
          onClick={handleBrowser}
        >
          <IconMusic />
        </button>
        <button
          className={"bg-[#FFC2A1] " + baseStyles}
          onClick={handleSettings}
        >
          <IconSettings />
        </button>
      </>
    );
  };

  const checkMarqueeSize = () => {
    const currentTrack = getCurrentlyPlayingElement();
    setShouldMarquee(
      currentTrack?.scrollWidth >
        currentTrack?.closest(".NowPlayingTitle")!.scrollWidth
    );
  };

  if (Object.keys(nowPlaying).length === 0) return;
  return (
    <>
      <div className="z-50 bg-back h-4 sticky -m-2 top-0 shadow-back shadow-[4px_4px]" />
      <div className="z-50 m-2 mx-auto truncate rounded-xl bg-white sticky top-2 border-4 border-black layer-1">
        <div className="p-4 flex flex-col">
          <div className="flex items-start justify-between">
            <div className="flex-1 overflow-hidden NowPlayingTitle">
              <StationTitle station={nowPlaying} />
              {songPlaying && (
                <Marquee
                  speed={30}
                  delay={5}
                  pauseOnHover
                  pauseOnClick
                  className="gap-4"
                  play={shouldMarquee}
                  loop={shouldMarquee ? 0 : 1}
                  onMount={checkMarqueeSize}
                >
                  <p
                    id="currentTrack"
                    className="overflow-hidden mr-6 lg:text-lg"
                  >
                    {songPlaying}
                  </p>
                </Marquee>
              )}
            </div>

            <div className="hidden md:flex flex-col justify-between gap-2">
              <div className="flex justify-between gap-2">
                {renderOptions()}
              </div>
              <VolumeControls />
            </div>
          </div>

          <div className="mt-4 md:hidden">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex justify-between xs:justify-normal gap-2 xs:mr-2">
                {renderOptions()}
              </div>
              <div className="w-full">
                <VolumeControls />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
