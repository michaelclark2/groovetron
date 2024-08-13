import { Station } from "radio-browser-api";
import { PuffLoader } from "react-spinners";
import StopIcon from "./icons/StopIcon";
import PlayIcon from "./icons/PlayIcon";

export default function PlayButton({
  playing,
  setPlaying,
  nowPlaying,
  isLoading,
  size,
}: {
  isLoading: boolean;
  playing: boolean;
  setPlaying: Function;
  nowPlaying: Station;
  size: number;
}) {
  return (
    <button
      onClick={() => {
        if (nowPlaying?.id != null) {
          setPlaying(!playing);
        }
      }}
      className={`p-4 bg-green-500 rounded-full h-[${
        size * 2
      }px] flex justify-center items-center`}
    >
      {isLoading ? (
        <PuffLoader size={size} color="green" />
      ) : playing ? (
        <StopIcon width={size} height={size} />
      ) : (
        <PlayIcon width={size} height={size} />
      )}
    </button>
  );
}
