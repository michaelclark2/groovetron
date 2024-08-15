import { Station } from "../types";
import StationCard from "./StationCard";
import { ReactNode, useEffect, useState } from "react";
import { IconCaretLeftFilled, IconCaretRightFilled } from "@tabler/icons-react";

export default function StationsPagination({
  title,
  limit,
  stations,
  emptyMessage,
}: {
  title: string;
  limit: number;
  stations: Station[];
  emptyMessage?: ReactNode;
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
    <div className="bg-slate-100 rounded-xl p-2 gap-y-4 flex flex-col">
      {title !== "" && <h3 className="text-xl">{title}</h3>}
      {currentStations.length
        ? currentStations?.map((station) => (
            <StationCard key={station.id} station={station} />
          ))
        : emptyMessage}

      {currentStations.length ? (
        <div className="flex gap-1 justify-center">
          <button
            onClick={() => handlePageChange("down")}
            className={offset - 1 < 0 ? "invisible" : ""}
          >
            <IconCaretLeftFilled />
          </button>

          {pageBullets.length > 1 &&
            pageBullets.map((bullet, index) => {
              const activeClasses =
                offset === index ? "text-blue-500 " : "text-slate-400";
              return (
                <button
                  key={index}
                  className={activeClasses}
                  onClick={() => goToPage(index)}
                >
                  {bullet}
                </button>
              );
            })}
          <button
            onClick={() => handlePageChange("up")}
            className={offset + 1 === pageBullets.length ? "invisible" : ""}
          >
            <IconCaretRightFilled />
          </button>
        </div>
      ) : null}
    </div>
  );
}
