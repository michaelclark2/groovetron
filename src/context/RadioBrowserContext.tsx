import { createContext, useContext } from "react";
// @ts-ignore
import { RadioBrowserApi } from "radio-browser-api";
import { name, version } from "../../package.json";

const RadioBrowserContext = createContext({} as RadioBrowserApi);
export function RadioBrowserProvider({ children }: { children: any }) {
  const RadioBrowser = new RadioBrowserApi(`${name}/${version}`);
  RadioBrowser.setBaseUrl("https://de1.api.radio-browser.info");

  return (
    <RadioBrowserContext.Provider value={RadioBrowser}>
      {children}
    </RadioBrowserContext.Provider>
  );
}

export function useRadioBrowser() {
  return useContext(RadioBrowserContext);
}
