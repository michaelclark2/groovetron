import { PuffLoader } from "react-spinners";
import {
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
} from "@tabler/icons-react";
import { usePlayer } from "../context/PlayerContext";

export default function PlayButton({ size }: { size: number }) {
  const { isPlaying, setIsPlaying, isLoading } = usePlayer();
  return (
    <button
      onClick={() => {
        setIsPlaying(!isPlaying);
      }}
      className={`p-4 bg-green-500 rounded-full h-[${
        size * 2
      }px] flex justify-center items-center`}
    >
      {isLoading ? (
        <PuffLoader size={size} color="green" />
      ) : isPlaying ? (
        <IconPlayerStopFilled size={size} />
      ) : (
        <IconPlayerPlayFilled size={size} />
      )}
    </button>
  );
}
