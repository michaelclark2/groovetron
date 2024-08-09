import { Station } from "radio-browser-api";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

function Pause({ width, height }: { width: number; height: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "24"}
      height={height ?? "24"}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="icon icon-tabler icons-tabler-filled icon-tabler-player-pause"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
      <path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
    </svg>
  );
}

function Play({ width, height }: { width: number; height: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "24"}
      height={height ?? "24"}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="icon icon-tabler icons-tabler-filled icon-tabler-player-play"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
    </svg>
  );
}

function VolumeIcon({ width, height }: { width?: number; height?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "24"}
      height={height ?? "24"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-volume"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      {/* TODO: display each <path> conditionally based on volume level */}
      <path d="M15 8a5 5 0 0 1 0 8" />
      <path d="M17.7 5a9 9 0 0 1 0 14" />
      <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-star"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-device-floppy"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
      <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M14 4l0 4l-6 0l0 -4" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-home"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-settings"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
      <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
    </svg>
  );
}

function CaretDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-caret-down"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 10l6 6l6 -6h-12" />
    </svg>
  );
}

function CaretUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-caret-up"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 14l-6 -6l-6 6h12" />
    </svg>
  );
}

function Controls({ audioRef }: { audioRef: HTMLAudioElement }) {
  const [currentVolume, setCurrentVolume] = useState(0);

  useEffect(() => {
    setCurrentVolume(audioRef?.volume);
    // TODO: save volume setting to localstorage for persistance
  }, [audioRef]);

  const handleVolumeChange = (e) => {
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

function StationTitle({ station }: { station: Station }) {
  return <h2 className="text-lg font-bold">{station?.name}</h2>;
}

function PlayButton({
  playing,
  setPlaying,
  nowPlaying,
  isLoading,
  size,
}: {
  isLoading: boolean;
  playing: boolean;
  setPlaying: Function;
  nowPlaying: Station;
  size: number;
}) {
  return (
    <button
      onClick={() => {
        if (nowPlaying?.id != null) {
          setPlaying(!playing);
        }
      }}
      className={`p-4 bg-green-500 rounded-full h-[${
        size * 2
      }px] flex justify-center items-center`}
    >
      {isLoading ? (
        <PuffLoader size={size} color="green" />
      ) : playing ? (
        <Pause width={size} height={size} />
      ) : (
        <Play width={size} height={size} />
      )}
    </button>
  );
}

export default function NowPlaying({ nowPlaying }: { nowPlaying: Station }) {
  const [playing, setPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const audioEl = document.getElementById("nowPlaying") as HTMLAudioElement;

  // useEffect(() => {
  //   const resetCollapseOnWindowResize = (e: Event) => {
  //     const window = e.target as Window;
  //     console.log(window.screen.width);
  //     if (window.screen.width >= 640 && !isCollapsed) {
  //       setIsCollapsed(true);
  //     }
  //   };
  //   window.addEventListener("resize", resetCollapseOnWindowResize);
  //   return () => {
  //     window.removeEventListener("resize", resetCollapseOnWindowResize);
  //   };
  // });

  useEffect(() => {
    if (nowPlaying.name) {
      document.title =
        "Radio" + (nowPlaying?.name ? ": " + nowPlaying.name : "");
      setIsLoading(true);
      setPlaying(true);
    }
  }, [nowPlaying.name]);

  useEffect(() => {
    playing ? audioEl?.play() : audioEl?.pause();
  }, [playing]);

  const options = [<SaveIcon />, <StarIcon />, <HomeIcon />, <SettingsIcon />];

  return (
    <div className="my-5 mx-auto truncate">
      <div className="p-4 rounded-3xl flex bg-slate-300 flex-col">
        <div className="flex items-start justify-between">
          <div className="flex justify-center mr-4">
            <PlayButton
              playing={playing}
              setPlaying={setPlaying}
              nowPlaying={nowPlaying}
              isLoading={isLoading}
              size={30}
            />
            <audio
              onPlaying={() => {
                setPlaying(true);
                setIsLoading(false);
              }}
              id="nowPlaying"
              src={nowPlaying?.urlResolved}
              autoPlay={playing}
            ></audio>
          </div>
          <div className="w-full">
            <StationTitle station={nowPlaying} />
            <p>Song Title / Artist Name</p>
          </div>
          <button
            className="bg-slate-200 rounded-full sm:hidden"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <CaretDownIcon /> : <CaretUpIcon />}
          </button>
          <div className="hidden sm:flex flex-col justify-between ">
            <div className="flex justify-between">
              {options.map((icon) => (
                <div className="bg-slate-100 rounded-full p-1 mx-1 mb-1 flex justify-center items-center w-[30px] h-[30px]">
                  {icon}
                </div>
              ))}
            </div>
            <Controls audioRef={audioEl} />
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
                <Controls audioRef={audioEl} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
