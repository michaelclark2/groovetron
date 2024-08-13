import { useEffect, useState } from "react";
import { useRadioBrowser } from "../context/RadioBrowserContext";
import { Station } from "radio-browser-api";
import StationCard from "./StationCard";

export default function StationBrowser({
  nowPlaying,
  setNowPlaying,
}: {
  nowPlaying: Station;
  setNowPlaying: Function;
}) {
  const RadioBrowser = useRadioBrowser();
  const [stations, setStations] = useState<Station[]>([]);
  useEffect(() => {
    const getStations = async () => {
      const results = await RadioBrowser.getStationsByRecentClicks(10);
      setStations(results);
    };
    getStations();
  }, []);

  return (
    <section>
      <h3 className="text-2xl mb-2">Stations</h3>
      <div className="flex justify-around mb-2">
        <div className="bg-slate-200 rounded-full p-2 px-4">Browse</div>
        <div className="bg-slate-200 rounded-full p-2 px-4">Favorites</div>
        <div className="bg-slate-200 rounded-full p-2 px-4">Songs</div>
      </div>
      <div>
        {stations?.map((station) => (
          <StationCard
            station={station}
            nowPlaying={nowPlaying}
            setNowPlaying={setNowPlaying}
          />
        ))}
      </div>
    </section>
  );
}
