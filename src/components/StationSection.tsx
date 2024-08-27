import { useRef, useState } from "react";
import StationBrowser from "./StationBrowser";
import FavoritesBrowser from "./FavoritesBrowser";
import TrackBrowser from "./TrackBrowser";
import { motion } from "framer-motion";
export type SectionState = string | "browse" | "favs" | "tracks";

function SlideTabs({
  setSectionState,
  sectionState,
}: {
  setSectionState: Function;
  sectionState: SectionState;
}) {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });
  return (
    <ul className="flex justify-between items-center my-4 layer-1 bg-white rounded-xl border-4 border-black">
      <Tab
        name="favs"
        setPosition={setPosition}
        sectionState={sectionState}
        setSectionState={setSectionState}
      >
        Favorites
      </Tab>
      <Tab
        name="browse"
        setPosition={setPosition}
        sectionState={sectionState}
        setSectionState={setSectionState}
      >
        Browse
      </Tab>
      <Tab
        name="tracks"
        setPosition={setPosition}
        sectionState={sectionState}
        setSectionState={setSectionState}
      >
        Tracks
      </Tab>
      <Cursor position={position} />
    </ul>
  );
}

function Tab({
  children,
  name,
  setPosition,
  setSectionState,
  sectionState,
}: {
  children: any;
  name: string;
  setPosition: Function;
  sectionState: SectionState;
  setSectionState: Function;
}) {
  const ref = useRef(null);
  const tabIsActive = name === sectionState;
  const activeClasses = "bg-green-500";
  return (
    <li
      ref={ref}
      onClick={() => {
        setSectionState(name);
      }}
      onMouseEnter={() => {
        if (!ref?.current || tabIsActive) return;

        const currentRef: HTMLElement = ref.current;

        const { width, height } = currentRef.getBoundingClientRect();

        setPosition({
          left: currentRef.offsetLeft,
          width,
          height,
          opacity: 1,
        });
      }}
      onMouseLeave={() => {
        if (!ref?.current || tabIsActive) return;

        const currentRef: HTMLElement = ref.current;

        const { width, height } = currentRef.getBoundingClientRect();

        setPosition({ left: currentRef.offsetLeft, width, height, opacity: 0 });
      }}
      className={
        "relative z-10 text-sm font-bold p-2 px-4 sm:px-8 rounded-lg transition h-12 items-center flex cursor-pointer " +
        (tabIsActive && activeClasses)
      }
    >
      {children}
    </li>
  );
}

function Cursor({ position }: { position: any }) {
  return (
    <motion.li
      animate={{ ...position }}
      className="absolute bg-green-300 h-8 rounded-lg"
    />
  );
}

export default function StationSection() {
  const [sectionState, setSectionState] = useState<SectionState>("browse");
  const displayStationSection = (sectionState: SectionState) => {
    switch (sectionState) {
      case "browse":
        return <StationBrowser />;
      case "favs":
        return <FavoritesBrowser />;
      case "tracks":
        return <TrackBrowser />;
      default:
        break;
    }
  };

  return (
    <section>
      <SlideTabs
        setSectionState={setSectionState}
        sectionState={sectionState}
      />

      <div className="layer-1 rounded-xl border-4 border-black bg-white">
        {displayStationSection(sectionState)}
      </div>
    </section>
  );
}
