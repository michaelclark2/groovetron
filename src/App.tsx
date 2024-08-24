import "./App.css";
import StationSection from "./components/StationSection";
import NowPlaying from "./components/NowPlaying";

function App() {
  return (
    <main className="p-2 sm:w-2/3 xl:w-1/3 sm:mx-auto bg-amber-300">
      <h1 className="text-4xl xxs:text-5xl text-center title mb-4">
        Groovetron
      </h1>
      <div className="bg-amber-300 h-4 sticky -m-2 top-0 top-spacer"></div>
      <NowPlaying />
      <StationSection />
    </main>
  );
}

export default App;
