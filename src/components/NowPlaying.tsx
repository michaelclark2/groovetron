import { Station } from "radio-browser-api";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

function Pause({ width, height }: { width: number; height: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "24"}
      height={height ?? "24"}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="icon icon-tabler icons-tabler-filled icon-tabler-player-pause"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
      <path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
    </svg>
  );
}

function Play({ width, height }: { width: number; height: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "24"}
      height={height ?? "24"}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="icon icon-tabler icons-tabler-filled icon-tabler-player-play"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
    </svg>
  );
}

function PlayButton({
  playing,
  setPlaying,
  nowPlaying,
  isLoading,
}: {
  isLoading: boolean;
  playing: boolean;
  setPlaying: Function;
  nowPlaying: Station;
}) {
  return (
    <button
      onClick={() => {
        if (nowPlaying?.id != null) {
          setPlaying(!playing);
        }
      }}
      className="p-5 m-5 bg-green-500 rounded-full w-20 h-20 flex justify-center items-center "
    >
      {isLoading ? (
        <PuffLoader size={40} />
      ) : playing ? (
        <Pause width={40} height={40} />
      ) : (
        <Play width={40} height={40} />
      )}
    </button>
  );
}
export default function NowPlaying({ nowPlaying }: { nowPlaying: Station }) {
  const [playing, setPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioEl = document.getElementById("nowPlaying");

  useEffect(() => {
    if (nowPlaying.name) {
      document.title =
        "Radio" + (nowPlaying?.name ? ": " + nowPlaying.name : "");
      setPlaying(true);
      setIsLoading(true);
    }
  }, [nowPlaying.name]);

  useEffect(() => {
    playing ? audioEl?.play() : audioEl?.pause();
  }, [playing]);

  return (
    <div className="my-5 sm:w-1/2 xl:w-1/3 mx-auto">
      <div className="p-5 rounded-3xl flex bg-slate-300 items-center">
        <div className="w-1/5">
          <img src={nowPlaying.favicon} height={100} width={100} />
        </div>
        <div className="w-1/5 flex justify-center">
          <PlayButton
            playing={playing}
            setPlaying={setPlaying}
            nowPlaying={nowPlaying}
            isLoading={isLoading}
          />
          <audio
            onCanPlay={() => setIsLoading(false)}
            id="nowPlaying"
            src={nowPlaying?.urlResolved}
            autoPlay={playing}
          ></audio>
        </div>
        <div className="w-3/5">
          <h2 className="text-2xl font-bold">{nowPlaying.name ?? "Nothing"}</h2>
          <p>Song Title</p>
          <p>Artist Name</p>
        </div>
      </div>
    </div>
  );
}
