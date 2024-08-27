import { ChangeEvent, useEffect, useState } from "react";
import { IconVolume, IconVolume2, IconVolume3 } from "@tabler/icons-react";
import { usePlayer } from "../context/PlayerContext";

export default function VolumeControls() {
  const [currentVolume, setCurrentVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [mutedVolume, setMutedVolume] = useState(0);
  const { audioRef, isPlaying } = usePlayer();

  useEffect(() => {
    setCurrentVolume(audioRef?.volume);
    // TODO: save volume setting to localstorage for persistance
  }, [audioRef, isPlaying]);

  useEffect(() => {
    audioRef.volume = currentVolume;
  }, [currentVolume]);

  const handleVolumeChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setCurrentVolume(input.valueAsNumber);
    // audioRef.volume = input.valueAsNumber;
  };

  const renderVolumeIcon = () => {
    let icon = <IconVolume3 />;
    if (currentVolume > 0) {
      icon = <IconVolume2 />;
    }
    if (currentVolume > 0.5) {
      return <IconVolume />;
    }
    return icon;
  };
  return (
    <div className="py-1 bg-slate-200 rounded-full flex justify-center items-center border-2 border-black layer-0 max-h-8">
      <button
        className="pl-1 max-w-8 max-h-8"
        onClick={() => {
          !isMuted && setMutedVolume(currentVolume);
          setCurrentVolume(isMuted ? mutedVolume : 0);
          setIsMuted(!isMuted);
        }}
      >
        {renderVolumeIcon()}
      </button>
      <input
        className="w-full mx-2"
        type="range"
        min={0}
        max={1}
        step={0.001}
        value={currentVolume}
        onChange={handleVolumeChange}
      />
    </div>
  );
}
