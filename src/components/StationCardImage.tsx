import { Station } from "radio-browser-api";
import { generateFromString } from "generate-avatar";
import { SyntheticEvent } from "react";

export default function StationCardImage({ station }: { station: Station }) {
  const getRandomImage = (seed: string) => {
    return `data:image/svg+xml;utf8,${generateFromString(seed)}`;
  };
  const handleImgError = (e: SyntheticEvent) => {
    const img = e.target as HTMLImageElement;
    img.src = getRandomImage(station?.id);
  };

  const imgSrc =
    station?.favicon === "" ? getRandomImage(station?.id) : station.favicon;

  return (
    <img
      src={imgSrc}
      onError={handleImgError}
      className="object-contain rounded-xl"
    />
  );
}
