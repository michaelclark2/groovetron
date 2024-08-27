import {
  AdvancedStationQuery,
  CountryResult,
  Station,
  StationSearchOrder,
} from "radio-browser-api";
import { useRadioBrowser } from "../context/RadioBrowserContext";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import StationsPagination from "./StationsPagination";
import { RingLoader } from "react-spinners";
import { IconFilterCog, IconSearch, IconX } from "@tabler/icons-react";

export default function StationBrowser() {
  const { RadioBrowser, recentClicks, topVotes, languages, countries, codecs } =
    useRadioBrowser();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Station[]>([]);

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<keyof typeof StationSearchOrder>(
    StationSearchOrder.name
  );

  const [tagInput, setTagInput] = useState("");
  const [tagList, setTagList] = useState([] as string[]);
  const [bitrateMin, setBitrateMin] = useState("0");
  const [bitrateMax, setBitrateMax] = useState("400");
  const [codecSelect, setCodecSelect] = useState("");
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (recentClicks.length > 0) {
      setIsLoading(false);
    }
  }, [recentClicks]);

  useEffect(() => {
    const debouncedSearchSubmitId = setTimeout(async () => {
      if (searchTerm === "" && tagList.length === 0) {
        setSearchResults([]);
        return;
      }
      const searchOptions = {
        name: searchTerm,
        order: sortBy,
        tagList,
        bitrateMin,
        bitrateMax,
        language,
        country,
        reverse: (
          [
            StationSearchOrder.bitrate,
            StationSearchOrder.votes,
            StationSearchOrder.clickCount,
          ] as (keyof typeof StationSearchOrder)[]
        ).includes(sortBy),
        limit: 300, // TODO: remove this, and truncate bullets in StationsPagination
      } as { [key: string]: any } & AdvancedStationQuery;
      if (codecSelect) searchOptions["codec"] = codecSelect;
      setIsLoading(true);
      const results = await RadioBrowser.searchStations(searchOptions);
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(debouncedSearchSubmitId);
  }, [
    searchTerm,
    sortBy,
    bitrateMax,
    bitrateMin,
    codecSelect,
    language,
    country,
    tagList,
  ]);

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
    if (value.endsWith(", ")) {
      const newTag = value.slice(0, -2);
      const newTagList = [...tagList, newTag];
      setTagList(newTagList);
      setTagInput("");
      return;
    }
    setTagInput(value);
  };

  const handleTagSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    if (data) {
      for (const [_, value] of data) {
        const newTag = (value as string).trim();
        setTagList([...tagList, newTag]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tag: string) => {
    const newTags = tagList.filter((t) => t !== tag);
    setTagList(newTags);
  };

  const handleBitrateMinChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setBitrateMin(value);
  };

  const handleBitrateMaxChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setBitrateMax(value);
  };

  const handleCodecChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLSelectElement;
    setCodecSelect(value);
  };

  const handleLanguageChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLSelectElement;
    setLanguage(value);
  };

  const handleCountryChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLSelectElement;
    setCountry(value);
  };

  const sortOptions = {
    Name: StationSearchOrder.name,
    Votes: StationSearchOrder.votes,
    Plays: StationSearchOrder.clickCount,
    Bitrate: StationSearchOrder.bitrate,
  } as { [key: string]: string };

  return (
    <div className="flex flex-col gap-6 rounded-xl p-2">
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
            <div className="tag-box flex flex-wrap  items-center gap-1 bg-white rounded-xl overflow-hidden p-2">
              {tagList?.map((tag, i) => (
                <div
                  key={tag + i}
                  className="tag bg-green-200 rounded-full px-2 text-sm flex items-center"
                >
                  <span>{tag}</span>
                  <button onClick={() => removeTag(tag)}>
                    <IconX size={16} />
                  </button>
                </div>
              ))}
              <form onSubmit={handleTagSubmit}>
                <input
                  type="text"
                  name="tag"
                  className="rounded-full focus:outline-none w-24"
                  value={tagInput}
                  onChange={handleTagChange}
                  placeholder="Tag"
                />
              </form>
            </div>
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
              <select
                name="codec"
                className="w-full rounded-full bg-white focus:outline-none"
                onChange={handleCodecChange}
                value={codecSelect}
              >
                <option />
                {codecs?.map((codec) => (
                  <option value={codec.name}>{codec.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="language gap-2 flex flex-col">
            <label htmlFor="language">Language:</label>
            <select
              name="language"
              className="w-full rounded-full bg-white focus:outline-none"
              onChange={handleLanguageChange}
              value={language}
            >
              <option />
              {languages?.map((lang: CountryResult) => (
                <option value={lang.name}>{lang.name}</option>
              ))}
            </select>
          </div>
          <div className="country gap-2 flex flex-col">
            <label htmlFor="country">Country:</label>
            <select
              name="country"
              className="w-full rounded-full bg-white focus:outline-none"
              onChange={handleCountryChange}
              value={country}
            >
              <option />
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
