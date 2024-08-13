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
      <h3 className="text-2xl">Stations</h3>
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
