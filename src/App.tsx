import { useState } from "react";
import "./App.css";
import StationBrowser from "./components/StationBrowser";
import NowPlaying from "./components/NowPlaying";
import { Station } from "radio-browser-api";

function App() {
  const [nowPlaying, setNowPlaying] = useState<Station>({} as Station);

  return (
    <main className="m-2 sm:w-3/4 xl:w-1/2 sm:mx-auto">
      <h1 className="font-mono text-4xl text-center">Radio</h1>
      <NowPlaying nowPlaying={nowPlaying} />
      <StationBrowser nowPlaying={nowPlaying} setNowPlaying={setNowPlaying} />
    </main>
  );
}

export default App;
