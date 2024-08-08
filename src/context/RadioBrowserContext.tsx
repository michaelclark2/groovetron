import { createContext, useContext } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import { name, version } from "../../package.json";

const RadioBrowserContext = createContext({});

export function RadioBrowserProvider({ children }: { children: any }) {
  const RadioBrowser = new RadioBrowserApi(`${name}/${version}`);

  return (
    <RadioBrowserContext.Provider value={RadioBrowser}>
      {children}
    </RadioBrowserContext.Provider>
  );
}

export function useRadioBrowser() {
  return useContext(RadioBrowserContext);
}
