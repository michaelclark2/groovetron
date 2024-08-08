import { Station } from "radio-browser-api";
export default function NowPlaying({ nowPlaying }: { nowPlaying: Station }) {
  return (
    <div className="m-5">
      <h2>{nowPlaying.name ?? "Nothing"}</h2>
      <audio src={nowPlaying?.url} autoPlay></audio>
    </div>
  );
}
