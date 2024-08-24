import "./App.css";
import StationSection from "./components/StationSection";
import NowPlaying from "./components/NowPlaying";

function App() {
  return (
    <main className="m-2 sm:w-2/3 xl:w-1/3 sm:mx-auto">
      <h1 className="text-4xl xxs:text-5xl text-center title mb-4">
        Groovetron
      </h1>
      <NowPlaying />
      <StationSection />
    </main>
  );
}

export default App;
