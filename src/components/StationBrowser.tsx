import { CountryResult, Station, StationSearchOrder } from "radio-browser-api";
import { useRadioBrowser } from "../context/RadioBrowserContext";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import StationsPagination from "./StationsPagination";
import { RingLoader } from "react-spinners";
import { IconFilterCog, IconSearch } from "@tabler/icons-react";

export default function StationBrowser() {
  const RadioBrowser = useRadioBrowser();
  const [isLoading, setIsLoading] = useState(true);
  const [recentClicks, setRecentClicks] = useState<Station[]>([]);
  const [topVotes, setTopVotes] = useState<Station[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Station[]>([]);

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<keyof typeof StationSearchOrder>(
    StationSearchOrder.name
  );
  const [languages, setLanguages] = useState([] as CountryResult[]);
  const [countries, setCountries] = useState([] as CountryResult[]);
  const [codecs, setCodecs] = useState([] as CountryResult[]);
  const [tagList, setTagList] = useState("");
  const [bitrateMin, setBitrateMin] = useState(0);
  const [bitrateMax, setBitrateMax] = useState(400);

  useEffect(() => {
    const getInitialData = async () => {
      setIsLoading(true);
      const recentClicks = await RadioBrowser.getStationsByRecentClicks(20);
      const topVotes = await RadioBrowser.getStationsByVotes(20);
      const allLanguages = await RadioBrowser.getLanguages();
      const allCountries = await RadioBrowser.getCountries();
      const allCodecs = await RadioBrowser.getCodecs();
      setLanguages(allLanguages);
      setCountries(allCountries);
      setCodecs(allCodecs);
      setRecentClicks(recentClicks);
      setTopVotes(topVotes);
      setIsLoading(false);
    };
    getInitialData();
  }, []);

  useEffect(() => {
    const debouncedSearchSubmitId = setTimeout(async () => {
      if (searchTerm === "") {
        setSearchResults([]);
        return;
      }
      setIsLoading(true);
      const results = await RadioBrowser.searchStations({
        name: searchTerm,
        order: sortBy ?? undefined,
        reverse: (
          [
            StationSearchOrder.bitrate,
            StationSearchOrder.votes,
            StationSearchOrder.clickCount,
          ] as (keyof typeof StationSearchOrder)[]
        ).includes(sortBy),
        limit: 300, // TODO: remove this, and truncate bullets in StationsPagination
      });
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(debouncedSearchSubmitId);
  }, [searchTerm, sortBy]);

  const handleSearchChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setSearchTerm(value);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const displayedStations =
    searchResults.length || searchTerm ? (
      <StationsPagination
        stations={searchResults}
        title={
          "Search results for " + searchTerm + ` (${searchResults.length})`
        }
        limit={12}
        emptyMessage={
          <p className="py-4">No stations found with the name {searchTerm}</p>
        }
      />
    ) : (
      <>
        <StationsPagination
          stations={recentClicks}
          title="Recent Clicks"
          limit={5}
        />
        <StationsPagination stations={topVotes} title="Top Votes" limit={5} />
      </>
    );

  const handleSortByChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLSelectElement;
    setSortBy(value as keyof typeof StationSearchOrder);
  };

  const handleTagChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setTagList(value);
  };

  const handleBitrateMinChange = (e: ChangeEvent) => {
    const { valueAsNumber } = e.target as HTMLInputElement;
    setBitrateMin(valueAsNumber);
  };

  const handleBitrateMaxChange = (e: ChangeEvent) => {
    const { valueAsNumber } = e.target as HTMLInputElement;
    setBitrateMax(valueAsNumber);
  };

  const sortOptions = {
    Name: StationSearchOrder.name,
    Votes: StationSearchOrder.votes,
    Plays: StationSearchOrder.clickCount,
    Bitrate: StationSearchOrder.bitrate,
  } as { [key: string]: string };

  return (
    <div className="flex flex-col gap-6 bg-slate-200 rounded-xl p-2">
      <h3 className="text-3xl p-2">Find Stations</h3>
      <div className="w-full flex flex-col sm:flex-row justify-between gap-2">
        <form
          className="sm:w-8/12 flex bg-white rounded-full p-2 gap-2"
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
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <label htmlFor="sortBy" className="text-nowrap">
              Sort By:
            </label>
            <select
              onChange={handleSortByChange}
              className="focus-visible:outline-none rounded-full p-2"
              name="sortBy"
            >
              {Object.keys(sortOptions).map((option) => (
                <option value={sortOptions[option] as string}>{option}</option>
              ))}
            </select>
          </div>
          <button
            className="p-2 bg-slate-100 rounded-full"
            onClick={() => setShowFilters(!showFilters)}
          >
            <IconFilterCog />
          </button>
        </div>
      </div>
      {showFilters && (
        <div className="flex flex-col bg-slate-100 p-2 rounded-xl gap-2">
          <h4 className="text-lg font-bold">Filter Options</h4>
          <div className="tags flex flex-col gap-2">
            <label htmlFor="tags">Tags:</label>
            <input
              type="text"
              name="tags"
              className="rounded-full"
              value={tagList}
              onChange={handleTagChange}
            />
          </div>
          <div className="flex gap-4">
            <div className="bitrate w-3/5 flex-col flex justify-between gap-2">
              <label htmlFor="bitrate">
                Bitrate: {bitrateMin} - {bitrateMax}
              </label>
              <div className="range-control flex h-full">
                <input
                  type="range"
                  name="bitrateMin"
                  step="1"
                  value={bitrateMin}
                  min={0}
                  max={200}
                  onChange={handleBitrateMinChange}
                  className="appearance-none w-full rounded-l-full"
                />
                <input
                  type="range"
                  name="bitrateMax"
                  step="1"
                  value={bitrateMax}
                  min={200}
                  max={400}
                  onChange={handleBitrateMaxChange}
                  className="appearance-none w-full rounded-r-full"
                />
              </div>
            </div>
            <div className="codec gap-2 flex-1 flex flex-col">
              <label htmlFor="codec">Codec:</label>
              <select name="codec" className="w-full rounded-full">
                {codecs?.map((codec) => (
                  <option value={codec.name}>{codec.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="language gap-2 flex flex-col">
            <label htmlFor="language">Language:</label>
            <select name="language" className="w-full rounded-full">
              <option selected>Select a language</option>
              {languages?.map((lang: CountryResult) => (
                <option value={lang.name}>{lang.name}</option>
              ))}
            </select>
          </div>
          <div className="country gap-2 flex flex-col">
            <label htmlFor="country">Country:</label>
            <select name="country" className="w-full rounded-full">
              <option selected>Select a country</option>
              {countries?.map((country: CountryResult) => (
                <option value={country.name}>{country.name}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-8">
        {isLoading ? (
          <RingLoader className="self-center my-12" color="green" size={200} />
        ) : (
          displayedStations
        )}
      </div>
    </div>
  );
}
