import { Station } from "radio-browser-api";
import StationCard from "./StationCard";
import { useState } from "react";
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
  const currentStations = stations.slice(offset * limit, limit);
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
      <div className="flex">
        <CaretLeftIcon /> &bull; &bull; <CaretRightIcon />
      </div>
    </div>
  );
}
