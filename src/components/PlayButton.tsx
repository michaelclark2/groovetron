import { PuffLoader } from "react-spinners";
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
} from "@tabler/icons-react";
import { usePlayer } from "../context/PlayerContext";

export default function PlayButton({ className }: { className?: string }) {
  const { isPlaying, setIsPlaying, isLoading } = usePlayer();
  return (
    <button
      onClick={() => {
        setIsPlaying(!isPlaying);
      }}
      className={className}
    >
      {isLoading ? (
        <PuffLoader size={"1em"} color="green" />
      ) : isPlaying ? (
        <IconPlayerPauseFilled />
      ) : (
        <IconPlayerPlayFilled />
      )}
    </button>
  );
}
