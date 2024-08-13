import { Station } from "radio-browser-api";
import StationCard from "./StationCard";
import { useEffect, useState } from "react";
import CaretRightIcon from "./icons/CaretRightIcon";
import CaretLeftIcon from "./icons/CaretLeftIcon";

export default function StationsPagination({
  title,
  limit,
  stations,
  nowPlaying,
  setNowPlaying,
}: {
  title: string;
  limit: number;
  stations: Station[];
  nowPlaying: Station;
  setNowPlaying: Function;
}) {
  const [offset, setOffset] = useState(0);
  const [currentStations, setCurrentStations] = useState<Station[]>(stations);

  const pageBullets = new Array(Math.ceil(stations?.length / limit)).fill(
    <>&bull;</>
  );

  useEffect(() => {
    const currentStations = stations.slice(
      offset * limit,
      offset * limit + limit
    );
    setCurrentStations(currentStations);
  }, [offset, stations]);

  const handlePageChange = (direction: string | "up" | "down") => {
    switch (direction) {
      case "up":
        if (offset + 1 === pageBullets.length) return;
        setOffset(offset + 1);
        break;
      case "down":
        if (offset - 1 < 0) return;
        setOffset(offset - 1);
        break;
      default:
        break;
    }
  };
  const goToPage = (pageNumber: number) => {
    setOffset(pageNumber);
  };
  return (
    <div className="bg-slate-100 rounded-xl p-2">
      <h3 className="text-2xl">{title}</h3>
      {currentStations?.map((station) => (
        <StationCard
          station={station}
          nowPlaying={nowPlaying}
          setNowPlaying={setNowPlaying}
        />
      ))}
      <div className="flex gap-1 justify-center">
        <button
          onClick={() => handlePageChange("down")}
          disabled={offset - 1 < 0}
          className="disabled:text-slate-400"
        >
          <CaretLeftIcon />
        </button>

        {pageBullets.map((bullet, index) => {
          const activeClasses =
            offset === index ? "text-blue-500 " : "text-slate-400";
          return (
            <button className={activeClasses} onClick={() => goToPage(index)}>
              {bullet}
            </button>
          );
        })}
        <button
          onClick={() => handlePageChange("up")}
          disabled={offset + 1 === pageBullets.length}
          className="disabled:text-slate-400"
        >
          <CaretRightIcon />
        </button>
      </div>
    </div>
  );
}
