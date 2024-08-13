import { useEffect, useState } from "react";
import { useRadioBrowser } from "../context/RadioBrowserContext";
import { Station } from "radio-browser-api";
import StationCard from "./StationCard";

export default function StationSection({
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
      <div className="flex justify-between mb-2">
        <div className="bg-slate-200 rounded-xl p-2 px-6 sm:px-8">
          Favorites
        </div>
        <div className="bg-slate-200 rounded-xl p-2 px-6 sm:px-8">Browse</div>
        <div className="bg-slate-200 rounded-xl p-2 px-6 sm:px-8">Songs</div>
      </div>
      <h3 className="text-2xl mb-2">Stations</h3>
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
