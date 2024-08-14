import { Station } from "radio-browser-api";
import { useUserData } from "../context/UserContext";
import StationsPagination from "./StationsPagination";

export default function FavoritesBrowser({
  nowPlaying,
  setNowPlaying,
}: {
  nowPlaying: Station;
  setNowPlaying: Function;
}) {
  const userData = useUserData();
  return (
    <div className="flex flex-col gap-6 bg-slate-200 rounded-xl p-2">
      <h3 className="text-3xl p-2">Favorite Stations</h3>
      <div className="flex flex-col gap-8">
        <StationsPagination
          nowPlaying={nowPlaying}
          setNowPlaying={setNowPlaying}
          stations={userData?.favs ?? []}
          limit={100}
          emptyMessage={<p>You don't have any favorite stations!</p>}
          title=""
        />
      </div>
    </div>
  );
}
