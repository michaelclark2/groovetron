import { Station } from "radio-browser-api";
import { useRadioBrowser } from "../context/RadioBrowserContext";
import { useEffect, useState } from "react";
import StationCard from "./StationCard";
import StationsPagination from "./StationsPagination";

export default function StationBrowser({
  nowPlaying,
  setNowPlaying,
}: {
  nowPlaying: Station;
  setNowPlaying: Function;
}) {
  const RadioBrowser = useRadioBrowser();
  const [recentClicks, setRecentClicks] = useState<Station[]>([]);
  const [topVotes, setTopVotes] = useState<Station[]>([]);

  useEffect(() => {
    const getStations = async () => {
      const recentClicks = await RadioBrowser.getStationsByRecentClicks(30);
      const topVotes = await RadioBrowser.getStationsByVotes(30);
      setRecentClicks(recentClicks);
      setTopVotes(topVotes);
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
      </div>
    </div>
  );
}
