import { Station } from "radio-browser-api";
import { useEffect, useState } from "react";
import PlayButton from "./PlayButton";
import VolumeControls from "./VolumeControls";
import {
  IconCaretDown,
  IconCaretUp,
  IconDeviceFloppy,
  IconHome,
  IconSettings,
  IconStar,
} from "@tabler/icons-react";

import { usePlayer } from "../context/PlayerContext";

function StationTitle({ station }: { station: Station }) {
  return <h2 className="text-xl sm:text-2xl font-bold">{station?.name}</h2>;
}

export default function NowPlaying() {
  const { nowPlaying } = usePlayer();
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    if (nowPlaying.name) {
      document.title =
        "Radio" + (nowPlaying?.name ? ": " + nowPlaying.name : "");
    }
  }, [nowPlaying.name]);

  const options = [
    <IconDeviceFloppy />,
    <IconStar />,
    <IconHome />,
    <IconSettings />,
  ];

  if (Object.keys(nowPlaying).length === 0) return;
  return (
    <div className="my-5 mx-auto truncate">
      <div className="p-4 rounded-xl flex bg-slate-300 flex-col">
        <div className="flex items-start justify-between">
          <div className="flex justify-center mr-4">
            <PlayButton size={40} />
          </div>
          <div className="w-full overflow-hidden">
            <StationTitle station={nowPlaying} />
            <p>Song Title / Artist Name</p>
          </div>
          <button
            className="bg-slate-200 rounded-full sm:hidden"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <IconCaretDown /> : <IconCaretUp />}
          </button>
          <div className="hidden sm:flex flex-col justify-between">
            <div className="flex justify-between">
              {options.map((icon) => (
                <div className="bg-slate-100 rounded-full p-1 mx-1 mb-3 flex justify-center items-center w-[30px] h-[30px]">
                  {icon}
                </div>
              ))}
            </div>
            <VolumeControls />
          </div>
        </div>
        {isCollapsed ? null : (
          <div className="mt-4 sm:hidden">
            <div className="flex">
              <div className="w-1/2 flex">
                {options.map((icon) => (
                  <div className="bg-slate-100 rounded-full p-1 mx-1 mb-1 flex justify-center items-center w-[30px] h-[30px]">
                    {icon}
                  </div>
                ))}
              </div>
              <div className="w-1/2">
                <VolumeControls />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
