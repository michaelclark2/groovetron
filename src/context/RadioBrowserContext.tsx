import { createContext, useContext, useEffect, useState } from "react";
// @ts-ignore
import { CountryResult, RadioBrowserApi, Station } from "radio-browser-api";
import { name, version } from "../../package.json";

const RadioBrowserContext = createContext(
  {} as {
    RadioBrowser: RadioBrowserApi;
    recentClicks: Station[];
    topVotes: Station[];
    languages: CountryResult[];
    countries: CountryResult[];
    codecs: CountryResult[];
  }
);
export function RadioBrowserProvider({ children }: { children: any }) {
  const RadioBrowser = new RadioBrowserApi(`${name}/${version}`, true);
  RadioBrowser.setBaseUrl("https://de1.api.radio-browser.info");
  const [recentClicks, setRecentClicks] = useState<Station[]>([]);
  const [topVotes, setTopVotes] = useState<Station[]>([]);
  const [languages, setLanguages] = useState([] as CountryResult[]);
  const [countries, setCountries] = useState([] as CountryResult[]);
  const [codecs, setCodecs] = useState([] as CountryResult[]);

  useEffect(() => {
    const getInitialData = async () => {
      if (recentClicks.length === 0) {
        const clicks = await RadioBrowser.getStationsByRecentClicks(50);
        const votes = await RadioBrowser.getStationsByVotes(50);
        const allLanguages = await RadioBrowser.getLanguages();
        const allCountries = await RadioBrowser.getCountries();
        const allCodecs = await RadioBrowser.getCodecs();
        setLanguages(allLanguages);
        setCountries(allCountries);
        setCodecs(allCodecs);
        setRecentClicks(clicks);
        setTopVotes(votes);
      }
    };
    getInitialData();
  }, []);

  return (
    <RadioBrowserContext.Provider
      value={{
        RadioBrowser,
        recentClicks,
        topVotes,
        languages,
        countries,
        codecs,
      }}
    >
      {children}
    </RadioBrowserContext.Provider>
  );
}

export function useRadioBrowser() {
  return useContext(RadioBrowserContext);
}
