import { Station } from "radio-browser-api";
import StationCardImage from "./StationCardImage";
import { useState } from "react";
import {
  IconHome,
  IconPlayerPlayFilled,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";
import { useUserData } from "../context/UserContext";
import { useRadioBrowser } from "../context/RadioBrowserContext";
import { usePlayer } from "../context/PlayerContext";

function StationTags({ station }: { station: Station }) {
  const Bitrate = ({ station }: { station: Station }) => {
    if (station?.bitrate == 0) return null;
    return (
      <div className="bg-pink-300 p-1 rounded-md text-xs">
        {station.bitrate} Kb/s {station.codec}
      </div>
    );
  };
  const CountryTag = ({ station }: { station: Station }) => {
    if (station?.countryCode === "") return;
    const [showTitle, setShowTitle] = useState(false);
    const getFlagEmoji = (countryCode: string) => {
      // thanks to https://dev.to/jorik/country-code-to-flag-emoji-a21
      const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt(0));
      return String.fromCodePoint(...codePoints);
    };
    return (
      <div
        className="bg-blue-200 p-1 rounded-md text-xs"
        onClick={() => setShowTitle(!showTitle)}
        onMouseOver={() => setShowTitle(true)}
        onMouseLeave={() => setShowTitle(false)}
      >
        {getFlagEmoji(station.countryCode)}
        {showTitle ? (
          <span className="absolute block p-1 mt-2 rounded-md bg-blue-200">
            {station.country}
          </span>
        ) : null}
      </div>
    );
  };
  const ClickCount = ({ station }: { station: Station }) => {
    return (
      <div className="bg-orange-300 p-1 rounded-md text-xs flex items-center">
        {station?.clickCount}
        <IconPlayerPlayFilled size={12} />
      </div>
    );
  };
  const StationTags = ({ station }: { station: Station }) => {
    const { tags } = station;

    return tags.map((tag) => (
      <div key={tag} className="bg-green-300 p-1 rounded-md text-xs">
        {tag}
      </div>
    ));
  };
  const VoteCount = ({ station }: { station: Station }) => {
    return (
      <div className="bg-yellow-300 p-1 rounded-md text-xs flex items-center">
        {station?.votes}
        <IconStarFilled size={12} />
      </div>
    );
  };
  return (
    <div className="flex flex-wrap gap-1">
      <Bitrate station={station} />
      <VoteCount station={station} />
      <ClickCount station={station} />
      <CountryTag station={station} />
      <StationTags station={station} />
    </div>
  );
}

export default function StationCard({ station }: { station: Station }) {
  const RadioBrowser = useRadioBrowser();
  const { userData, addToFaves, removeFromFaves } = useUserData();
  const { nowPlaying, setNowPlaying } = usePlayer();
  const isStationNowPlaying = station.id === nowPlaying?.id;
  const activeClasses = "bg-slate-300 rounded-tl-xl";
  const isStationInFavs = userData?.favs?.some(
    (fav: Station) => fav.id === station.id
  );

  const changeStation = () => {
    setNowPlaying(station);
    RadioBrowser.sendStationClick(station.id);
  };

  return (
    <div
      className={
        "flex p-2 border-r-2 border-b-2 rounded-br-xl border-black " +
        (isStationNowPlaying ? activeClasses : "")
      }
    >
      <button
        onClick={changeStation}
        className="w-2/12 sm:w-1/12 flex items-start justify-center m-1"
      >
        <StationCardImage station={station} />
      </button>
      <div
        className="flex-1 flex-col justify-between ml-2 overflow-hidden"
        onClick={changeStation}
      >
        <h3 className="sm:text-xl text-lg font-bold overflow-hidden text-ellipsis pb-2">
          {station.name}
        </h3>
        <StationTags station={station} />
      </div>
      <div className="w-1/12 flex flex-col items-end justify-start gap-2">
        <button
          onClick={() => {
            if (isStationInFavs) {
              removeFromFaves(station.id);
            } else {
              addToFaves(station);
              RadioBrowser.voteForStation(station.id);
            }
          }}
          className=""
        >
          {isStationInFavs ? <IconStarFilled /> : <IconStar />}
        </button>
        <button
          className=""
          onClick={() => {
            window.open(station.homepage), "__blank";
          }}
        >
          <IconHome />
        </button>
      </div>
    </div>
  );
}
