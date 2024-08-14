import { Station } from "radio-browser-api";
import { createContext, useContext, useEffect, useState } from "react";

type UserData = {
  favs: Station[];
  songs: Song[];
};

type Song = {
  title: string;
  artist: string;
};

const UserContext = createContext({} as UserData);

export function UserContextProvider({ children }: { children: any }) {
  const [userData, setUserData] = useState({} as UserData);
  useEffect(() => {
    const results = JSON.parse(localStorage.getItem("userData")!) as UserData;
    setUserData(results);
  });

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
}

export const useUserData = () => useContext(UserContext);
