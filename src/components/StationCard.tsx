import { Station } from "radio-browser-api";
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
    <div className={"flex p-2 " + (isStationNowPlaying ? activeClasses : "")}>
      <button
        onClick={() => setNowPlaying(station)}
        className="w-1/6 sm:w-1/12 border p-1 border-slate-400"
      >
        <img src={station.favicon} height={50} width={50} />
      </button>
      <div className="w-5/6">
        <h3 className="font-bold">{station.name}</h3>
        <div className="flex stationTagSection">
          {tags.map((tag) => (
            <div className="mr-1 bg-green-300 p-1 rounded-md text-xs">
              {(station as TempStation)[tag]}
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/12 flex flex-col">
        <button className="bg-blue-500 p-1">Fav</button>
        <button className="bg-blue-500 p-1">Homepage</button>
      </div>
    </div>
  );
}