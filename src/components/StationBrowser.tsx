import { Station } from "radio-browser-api";
import { useRadioBrowser } from "../context/RadioBrowserContext";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import StationsPagination from "./StationsPagination";
import { RingLoader } from "react-spinners";
import { IconFilterCog, IconSearch } from "@tabler/icons-react";

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
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearchChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setSearchTerm(value);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-6 bg-slate-200 rounded-xl p-2">
      <h3 className="text-3xl p-2">Find Stations</h3>
      <div className="w-full flex gap-2">
        <form
          className="w-full flex bg-white rounded-full p-2 gap-2"
          onSubmit={handleFormSubmit}
        >
          <IconSearch />
          <input
            type="text"
            placeholder="Search"
            className="focus-visible:outline-none w-full"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
        <button className="p-2 bg-slate-100 rounded-full">
          <IconFilterCog />
        </button>
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
