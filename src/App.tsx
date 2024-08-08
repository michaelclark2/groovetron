import { useState } from "react";
import "./App.css";
import StationBrowser from "./components/StationBrowser";
import NowPlaying from "./components/NowPlaying";

function App() {
  const [nowPlaying, setNowPlaying] = useState([]);

  return (
    <main>
      <h1 className="font-mono text-4xl text-center">Radio</h1>
      <NowPlaying nowPlaying={nowPlaying} />
      <StationBrowser nowPlaying={nowPlaying} setNowPlaying={setNowPlaying} />
    </main>
  );
}

export default App;
