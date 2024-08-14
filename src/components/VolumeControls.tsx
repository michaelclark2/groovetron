import { ChangeEvent, useEffect, useState } from "react";
import { IconVolume, IconVolume2, IconVolume3 } from "@tabler/icons-react";

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
    <div className="py-1 bg-slate-200 rounded-full flex justify-center">
      <div className="pl-1">{renderVolumeIcon()}</div>
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
