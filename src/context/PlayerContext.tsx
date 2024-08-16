import IcecastMetadataPlayer, {
  IcecastMetadataPlayerIcyOggOptionsWithCallbacks,
} from "icecast-metadata-player";
import { Station } from "../types";
import { createContext, useContext, useEffect, useState } from "react";

const PlayerContext = createContext(
  {} as {
    player: IcecastMetadataPlayer;
    nowPlaying: Station;
    setNowPlaying: Function;
    isPlaying: boolean;
    isLoading: boolean;
    audioRef: HTMLAudioElement;
  }
);

export function PlayerContextProvider({ children }: { children: any }) {
  const [nowPlaying, setNowPlaying] = useState({} as Station);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [songPlaying, setSongPlaying] = useState({} as any);
  const [audioRef] = useState(new Audio());
  const playerOptions: IcecastMetadataPlayerIcyOggOptionsWithCallbacks = {
    audioElement: audioRef,
    metadataTypes: ["icy", "ogg"],
    bufferLength: 3,
    enableLogging: true,
    onSwitch() {
      setIsLoading(true);
    },
    onLoad: () => {
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
      setSongPlaying(value);
      console.log(songPlaying);
    },

    onError: () => {
      // handle errors
    },
  };
  const [player, setPlayer] = useState({} as IcecastMetadataPlayer);

  useEffect(() => {
    if (nowPlaying.urlResolved) {
      if (player.endpoint) {
        player.detachAudioElement();
      }
      setPlayer(
        new IcecastMetadataPlayer(nowPlaying.urlResolved, playerOptions)
      );
    }
  }, [nowPlaying]);

  useEffect(() => {
    player.endpoint ?? player.play();
  }, [player]);
  return (
    <PlayerContext.Provider
      value={{
        player,
        nowPlaying,
        setNowPlaying,
        isPlaying,
        isLoading,
        audioRef,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
export const usePlayer = () => useContext(PlayerContext);
