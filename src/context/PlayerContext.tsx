import { Station } from "radio-browser-api";
import { createContext, useContext, useEffect, useState } from "react";

const PlayerContext = createContext(
  {} as {
    nowPlaying: Station;
    setNowPlaying: Function;
    isPlaying: boolean;
    setIsPlaying: Function;
    isLoading: boolean;
    audioRef: HTMLAudioElement;
  }
);

export function PlayerContextProvider({ children }: { children: any }) {
  const [nowPlaying, setNowPlaying] = useState({} as Station);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const [songPlaying, setSongPlaying] = useState({} as any);
  const audioRef = document.getElementById("nowPlaying")! as HTMLAudioElement;
  if (audioRef) {
    audioRef.addEventListener("playing", () => {
      setIsLoading(false);
      setIsPlaying(true);
    });
    audioRef.addEventListener("pause", () => {
      setIsPlaying(false);
    });
    audioRef.addEventListener("loadstart", () => {
      setIsLoading(true);
    });
  }

  useEffect(() => {
    if (audioRef) {
      isPlaying ? audioRef.play() : audioRef.pause();
    }
  }, [isPlaying, audioRef]);

  return (
    <PlayerContext.Provider
      value={{
        nowPlaying,
        setNowPlaying,
        isPlaying,
        setIsPlaying,
        isLoading,
        audioRef,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
export const usePlayer = () => useContext(PlayerContext);
