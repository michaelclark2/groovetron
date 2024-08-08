import { useEffect, useState } from "react";
import { useRadioBrowser } from "../context/RadioBrowserContext";
import { Station } from "radio-browser-api";
export default function StationBrowser({
  nowPlaying,
  setNowPlaying,
}: {
  nowPlaying: Station;
  setNowPlaying: Function;
}) {
  const RadioBrowser = useRadioBrowser();
  const [stations, setStations] = useState([]);
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
          <div
            className={
              station.id === nowPlaying?.id
                ? "flex p-2 border-2 border-blue-500"
                : "flex p-2 "
            }
          >
            <button
              onClick={() => setNowPlaying(station)}
              className="bg-blue-500 p-2"
            >
              Play
            </button>
            <img src={station.favicon} height={50} width={50} />
            <p>
              {station.name} : {station.clickCount}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
