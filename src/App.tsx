import { useEffect, useState } from "react";
import "./App.css";
import { RadioBrowserApi, StationSearchOrder } from "radio-browser-api";

const RadioBrowser = new RadioBrowserApi("Radiooo");

function App() {
  const [stations, setStations] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    const getStations = async () => {
      const results = await RadioBrowser.getStationsByClicks(30);
      setStations(results);
    };
    getStations();
  }, []);
  return (
    <>
      <h1 className="font-mono text-6xl">Radio</h1>
      <div className="m-5">
        <h2>{nowPlaying.name ?? "Nothing"}</h2>
        <audio src={nowPlaying?.url} autoPlay></audio>
      </div>
      <div>
        {stations?.map((station) => (
          <div className="flex">
            <button
              onClick={() => setNowPlaying(station)}
              className="bg-blue-500 p-2"
            >
              Play
            </button>
            <img src={station.favicon} height={50} width={50} />
            <p>{station.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
