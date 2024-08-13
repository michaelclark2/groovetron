import { Station } from "radio-browser-api";
import StarIcon from "./icons/StarIcon";
import HomeIcon from "./icons/HomeIcon";
import StationCardImage from "./StationCardImage";
import { useState } from "react";
import PlayIcon from "./icons/PlayIcon";

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
        .map((char) => 127397 + char.charCodeAt());
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
      <div className="bg-yellow-300 p-1 rounded-md text-xs flex items-center">
        {station?.clickCount}
        <PlayIcon width={12} height={12} />
      </div>
    );
  };
  return (
    <div className="flex flex-wrap gap-1">
      <Bitrate station={station} />
      <ClickCount station={station} />
      <CountryTag station={station} />
      {station?.tags?.map((tag) => (
        <div className="bg-green-300 p-1 rounded-md text-xs">{tag}</div>
      ))}
    </div>
  );
}

export default function StationCard({
  station,
  nowPlaying,
  setNowPlaying,
}: {
  station: Station;
  nowPlaying: Station;
  setNowPlaying: Function;
}) {
  const isStationNowPlaying = station.id === nowPlaying?.id;
  const activeClasses = "ring ring-blue-500";

  return (
    <div
      className={
        "flex p-2 rounded-xl bg-slate-200 my-4 " +
        (isStationNowPlaying ? activeClasses : "")
      }
    >
      <button
        onClick={() => setNowPlaying(station)}
        className="w-3/12 sm:w-1/12 flex items-center justify-center aspect-square bg-slate-100 rounded-xl overflow-clip"
      >
        <StationCardImage station={station} />
      </button>
      <div className="w-5/6 flex flex-col justify-between ml-2 overflow-hidden">
        <h3 className="sm:text-xl text-lg font-bold overflow-hidden text-nowrap text-ellipsis">
          {station.name}
        </h3>
        <StationTags station={station} />
      </div>
      <div className="w-1/12 flex flex-col items-end justify-between">
        <button className="">
          <StarIcon />
        </button>
        <button className="">
          <HomeIcon />
        </button>
      </div>
    </div>
  );
}
