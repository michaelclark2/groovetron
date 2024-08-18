import { Station } from "radio-browser-api";
import { createContext, useContext, useEffect, useState } from "react";

const PlayerContext = createContext(
  {} as {
    nowPlaying: Station;
    setNowPlaying: Function;
    isPlaying: boolean;
    setIsPlaying: Function;
    songPlaying: string;
    isLoading: boolean;
    audioRef: HTMLAudioElement;
  }
);

export function PlayerContextProvider({ children }: { children: any }) {
  const [nowPlaying, setNowPlaying] = useState({} as Station);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [songPlaying, setSongPlaying] = useState("");
  const audioRef = document.getElementById("nowPlaying")! as HTMLAudioElement;
  if (audioRef) {
    audioRef.addEventListener("playing", () => {
      setIsLoading(false);
      setIsPlaying(true);
    });
    audioRef.addEventListener("canplay", () => {
      setIsLoading(false);
      setIsPlaying(true);
    });
    audioRef.addEventListener("pause", () => {
      setIsPlaying(false);
    });
    audioRef.addEventListener("loadstart", () => {
      setIsLoading(true);
      setIsPlaying(false);
    });
    audioRef.addEventListener("error", () => {
      audioRef.src = nowPlaying.url;
    });
  }

  useEffect(() => {
    if (audioRef) {
      isPlaying ? audioRef.play() : audioRef.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef && isPlaying) {
      const getTrackMetadata = async () => {
        const results = await fetch("/metadata", {
          method: "POST",
          body: JSON.stringify({ streamUrl: nowPlaying.urlResolved }),
        });
        const metadata = await results.text();
        const trackTitle = transformMetadata(metadata);
        setSongPlaying(trackTitle);
      };
      getTrackMetadata();
      const interval = setInterval(() => {
        getTrackMetadata();
        console.log("poll for metadata");
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, nowPlaying]);

  return (
    <PlayerContext.Provider
      value={{
        nowPlaying,
        setNowPlaying,
        isPlaying,
        setIsPlaying,
        isLoading,
        audioRef,
        songPlaying,
      }}
    >
      {children}
      <audio
        src={nowPlaying.urlResolved}
        id="nowPlaying"
        autoPlay={isPlaying}
      />
    </PlayerContext.Provider>
  );
}

const transformMetadata = (metadata: string) => {
  if (metadata.startsWith("StreamTitle")) {
    const title = metadata.match(/(?:StreamTitle=')(.*?)(?:';)/)![1];
    return title;
  }
  return metadata;
};

export const usePlayer = () => useContext(PlayerContext);
