import IcecastMetadataPlayer, {
  IcecastMetadataPlayerIcyOggOptionsWithCallbacks,
} from "icecast-metadata-player";
import { Station } from "radio-browser-api";
import { createContext, useContext, useEffect, useState } from "react";

const PlayerContext = createContext(
  {} as {
    player: IcecastMetadataPlayer;
    nowPlaying: Station;
    setNowPlaying: Function;
    isPlaying: boolean;
    isLoading: boolean;
  }
);

export function PlayerContextProvider({ children }: { children: any }) {
  const [nowPlaying, setNowPlaying] = useState({} as Station);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [songPlaying, setSongPlaying] = useState({} as any);
  const playerOptions: IcecastMetadataPlayerIcyOggOptionsWithCallbacks = {
    metadataTypes: ["icy", "ogg"],
    enableLogging: true,
    onSwitch() {
      setIsLoading(true);
    },
    onPlay: () => {
      setIsPlaying(true);
      setIsLoading(false);
    },
    onStop: () => {
      setIsPlaying(false);
    },
    onMetadata: (value: any) => {
      console.log("onMetadata");
      console.log(value);
      setSongPlaying(value);
    },
  };
  const [player, setPlayer] = useState(
    new IcecastMetadataPlayer("", playerOptions)
  );

  return (
    <PlayerContext.Provider
      value={{ player, nowPlaying, setNowPlaying, isPlaying, isLoading }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
export const usePlayer = () => useContext(PlayerContext);
