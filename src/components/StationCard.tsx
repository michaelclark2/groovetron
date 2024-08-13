import { Station } from "radio-browser-api";
import StarIcon from "./icons/StarIcon";
import HomeIcon from "./icons/HomeIcon";
type TempStation = Station & { [key: string]: string };

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
  const tags = ["bitrate", "codec", "votes", "clickCount"];

  return (
    <div
      className={
        "flex p-2 rounded-xl bg-slate-200 my-2" +
        (isStationNowPlaying ? activeClasses : "")
      }
    >
      <button
        onClick={() => setNowPlaying(station)}
        className="w-1/6 sm:w-1/12 flex items-start"
      >
        <img src={station.favicon} />
      </button>
      <div className="w-5/6 flex flex-col ml-2">
        <h3 className="font-bold overflow-hidden text-nowrap text-ellipsis">
          {station.name}
        </h3>
        <div className="flex stationTagSection">
          {tags.map((tag) => (
            <div className="mr-1 bg-green-300 p-1 rounded-md text-xs">
              {(station as TempStation)[tag]}
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/12 flex flex-col items-end">
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
