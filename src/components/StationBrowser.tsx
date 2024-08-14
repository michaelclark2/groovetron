import { Station } from "radio-browser-api";
import { useRadioBrowser } from "../context/RadioBrowserContext";
import { useEffect, useState } from "react";
import StationsPagination from "./StationsPagination";
import { RingLoader } from "react-spinners";

export default function StationBrowser({
  nowPlaying,
  setNowPlaying,
}: {
  nowPlaying: Station;
  setNowPlaying: Function;
}) {
  const RadioBrowser = useRadioBrowser();
  const [isLoading, setIsLoading] = useState(true);
  const [recentClicks, setRecentClicks] = useState<Station[]>([]);
  const [topVotes, setTopVotes] = useState<Station[]>([]);

  useEffect(() => {
    const getStations = async () => {
      setIsLoading(true);
      const recentClicks = await RadioBrowser.getStationsByRecentClicks(20);
      const topVotes = await RadioBrowser.getStationsByVotes(20);
      setRecentClicks(recentClicks);
      setTopVotes(topVotes);
      setIsLoading(false);
    };
    getStations();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-3xl">Find Stations</h3>
      <div className="w-full flex">
        <input type="text" placeholder="Search" />
      </div>
      <div className="flex flex-col gap-8">
        {isLoading ? (
          <RingLoader className="self-center" size={200} />
        ) : (
          <>
            <StationsPagination
              stations={recentClicks}
              nowPlaying={nowPlaying}
              setNowPlaying={setNowPlaying}
              title="Recent Clicks"
              limit={5}
            />
            <StationsPagination
              stations={topVotes}
              nowPlaying={nowPlaying}
              setNowPlaying={setNowPlaying}
              title="Top Votes"
              limit={5}
            />
          </>
        )}
      </div>
    </div>
  );
}
