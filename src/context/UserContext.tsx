import { Station } from "../types";
import { createContext, useContext, useEffect, useState } from "react";

class UserData {
  favs = [] as Station[];
  songs = [] as Song[];
}

type Song = {
  title: string;
  artist: string;
};

const UserContext = createContext({} as any);

export function UserContextProvider({ children }: { children: any }) {
  const [userData, setUserData] = useState(new UserData());

  useEffect(() => {
    if (userData?.favs.length > 0) {
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

  return (
    <UserContext.Provider value={{ userData, addToFaves, removeFromFaves }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserData = () => useContext(UserContext);
