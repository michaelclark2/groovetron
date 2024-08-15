import { useState } from "react";
import "./App.css";
import StationSection from "./components/StationSection";
import NowPlaying from "./components/NowPlaying";
import { Station } from "radio-browser-api";

function App() {
  return (
    <main className="m-2 sm:w-3/4 xl:w-1/2 sm:mx-auto">
      <h1 className="font-mono text-5xl text-center">Groovetron</h1>
      <NowPlaying />
      <StationSection />
    </main>
  );
}

export default App;
