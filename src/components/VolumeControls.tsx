import { ChangeEvent, useEffect, useState } from "react";
import VolumeIcon from "./icons/VolumeIcon";

export default function VolumeControls({
  audioRef,
}: {
  audioRef: HTMLAudioElement;
}) {
  const [currentVolume, setCurrentVolume] = useState(0);

  useEffect(() => {
    setCurrentVolume(audioRef?.volume);
    // TODO: save volume setting to localstorage for persistance
  }, [audioRef]);

  const handleVolumeChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setCurrentVolume(input.valueAsNumber);
    audioRef.volume = currentVolume;
  };
  return (
    <div className="py-1 bg-slate-200 rounded-full flex justify-center">
      <div className="pl-1">
        <VolumeIcon />
      </div>
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
