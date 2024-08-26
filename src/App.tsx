import "./App.css";
import StationSection from "./components/StationSection";
import NowPlaying from "./components/NowPlaying";

function App() {
  return (
    <main className="p-2 sm:w-2/3 xl:w-3/5 sm:mx-auto bg-amber-300">
      <h1 className="text-4xl xxs:text-5xl sm:text-6xl 2xl:text-7xl text-center title mb-4">
        Groovetron
      </h1>
      <NowPlaying />
      <StationSection />
    </main>
  );
}

export default App;
