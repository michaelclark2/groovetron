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

  return (
    <section>
      <div className="flex justify-between mb-2 sm:justify-around">
        <button
          className="bg-slate-200 rounded-xl p-2 px-6 sm:px-8"
          onClick={() => setSectionState("favs")}
        >
          Favorites
        </button>
        <button
          className="bg-slate-200 rounded-xl p-2 px-6 sm:px-8"
          onClick={() => setSectionState("browse")}
        >
          Browse
        </button>
        <button
          className="bg-slate-200 rounded-xl p-2 px-6 sm:px-8"
          onClick={() => setSectionState("songs")}
        >
          Songs
        </button>
      </div>

      <div>{displayStationSection(sectionState)}</div>
    </section>
  );
}
