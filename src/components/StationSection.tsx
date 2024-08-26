import { useState } from "react";
import StationBrowser from "./StationBrowser";
import FavoritesBrowser from "./FavoritesBrowser";
import SongBrowser from "./SongBrowser";
export type SectionState = string | "browse" | "favs" | "songs";

export default function StationSection() {
  const [sectionState, setSectionState] = useState<SectionState>("browse");
  const displayStationSection = (sectionState: SectionState) => {
    switch (sectionState) {
      case "browse":
        return <StationBrowser />;
      case "favs":
        return <FavoritesBrowser />;
      case "songs":
        return <SongBrowser />;
      default:
        break;
    }
  };

  const navClasses =
    "bg-blue-200 text-sm font-bold rounded-xl p-2 px-4 sm:px-8 border-4 border-black transition ";

  const activeClasses = "bg-green-200 layer-2";

  return (
    <section>
      <nav className="flex justify-between my-4">
        <button
          className={
            navClasses + (sectionState === "favs" ? activeClasses : "layer-1")
          }
          onClick={() => setSectionState("favs")}
        >
          Favorites
        </button>
        <button
          className={
            navClasses + (sectionState === "browse" ? activeClasses : "layer-1")
          }
          onClick={() => setSectionState("browse")}
        >
          Browse
        </button>
        <button
          className={
            navClasses + (sectionState === "songs" ? activeClasses : "layer-1")
          }
          onClick={() => setSectionState("songs")}
        >
          Tracks
        </button>
      </nav>

      <div className="layer-1 rounded-xl border-4 border-black bg-white">
        {displayStationSection(sectionState)}
      </div>
    </section>
  );
}
