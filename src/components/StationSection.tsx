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
    "bg-blue-200 text-sm font-bold rounded-xl p-2 px-4 sm:px-8";

  const activeClasses = " bg-green-200";

  return (
    <section>
      <div className="flex justify-between mb-2 sm:justify-around">
        <button
          className={navClasses + (sectionState === "favs" && activeClasses)}
          onClick={() => setSectionState("favs")}
        >
          Favorites
        </button>
        <button
          className={navClasses + (sectionState === "browse" && activeClasses)}
          onClick={() => setSectionState("browse")}
        >
          Browse
        </button>
        <button
          className={navClasses + (sectionState === "songs" && activeClasses)}
          onClick={() => setSectionState("songs")}
        >
          Songs
        </button>
      </div>

      <div>{displayStationSection(sectionState)}</div>
    </section>
  );
}
