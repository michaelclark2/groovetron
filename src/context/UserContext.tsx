import { Station } from "radio-browser-api";
import { createContext, useContext, useEffect, useState } from "react";

class UserData {
  favs = [] as Station[];
  tracks = [] as Track[];
}

export type Track = {
  track: string;
  station: Station;
  timestamp: Date;
};

const UserContext = createContext({} as any);

export function UserContextProvider({ children }: { children: any }) {
  const [userData, setUserData] = useState(new UserData());

  useEffect(() => {
    if (Object.keys(userData).includes("songs")) {
      //@ts-ignore
      userData.tracks = userData.songs;
      //@ts-ignore
      delete userData.songs;
    }
    if (userData?.favs.length > 0 || userData?.tracks.length > 0) {
      saveUserDataToLocalStorage(userData);
    }
  }, [userData]);

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem("userData")!) as UserData;
    if (results !== null) {
      setUserData(results);
    }
  }, []);

  const saveUserDataToLocalStorage = (userData: UserData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const addToFaves = (station: Station) => {
    const newFaves = [...userData.favs, station];
    const newUserData = { ...userData, favs: newFaves };
    setUserData(newUserData);
  };

  const removeFromFaves = (stationId: string) => {
    const newFaves = userData.favs.filter(
      (station) => station.id !== stationId
    );
    const newUserData = { ...userData, favs: newFaves };
    setUserData(newUserData);
    if (newFaves.length === 0) {
      saveUserDataToLocalStorage(newUserData);
    }
  };

  const addToSongs = (song: Track) => {
    const newSongs = [...userData.tracks, song];
    const newUserData = { ...userData, tracks: newSongs };
    setUserData(newUserData);
  };

  const removeFromSongs = (track: Track) => {
    const newSongs = userData.tracks.filter(
      (s) => s.track !== track.track && s.station.id !== track.station.id
    );
    const newUserData = { ...userData, songs: newSongs };
    setUserData(newUserData);
    if (newSongs.length === 0) {
      saveUserDataToLocalStorage(newUserData);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        addToFaves,
        removeFromFaves,
        addToSongs,
        removeFromSongs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserData = () => useContext(UserContext);
