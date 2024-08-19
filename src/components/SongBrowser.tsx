import { Song, useUserData } from "../context/UserContext";

export default function SongBrowser() {
  const { userData } = useUserData();

  return (
    <div className="flex flex-col gap-6 bg-slate-200 rounded-xl p-2">
      <h3 className="text-3xl p-2">Saved Tracks</h3>
      <div className="w-full flex flex-col gap-4">
        {userData?.songs?.map((song: Song) => (
          <div className="flex flex-col w-full bg-white p-2 rounded-xl">
            <h3 className="font-bold text-xl py-2">{song.station.name}</h3>
            <p className="pb-2">{song.track}</p>
            <p className="text-sm">
              {new Date(song.timestamp).toLocaleDateString("en-us", {
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
