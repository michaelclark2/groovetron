import { PuffLoader } from "react-spinners";
import {
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
} from "@tabler/icons-react";
import { usePlayer } from "../context/PlayerContext";

export default function PlayButton({ size }: { size: number }) {
  const { player, isLoading } = usePlayer();
  return (
    <button
      onClick={() => {
        player.state === "playing" ? player.stop() : player.play();
      }}
      className={`p-4 bg-green-500 rounded-full h-[${
        size * 2
      }px] flex justify-center items-center`}
    >
      {isLoading ? (
        <PuffLoader size={size} color="green" />
      ) : player.state === "playing" ? (
        <IconPlayerStopFilled size={size} />
      ) : (
        <IconPlayerPlayFilled size={size} />
      )}
    </button>
  );
}
