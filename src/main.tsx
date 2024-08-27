import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RadioBrowserProvider } from "./context/RadioBrowserContext.tsx";
import { UserContextProvider } from "./context/UserContext.tsx";
import { PlayerContextProvider } from "./context/PlayerContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RadioBrowserProvider>
      <UserContextProvider>
        <PlayerContextProvider>
          <App />
        </PlayerContextProvider>
      </UserContextProvider>
    </RadioBrowserProvider>
  </StrictMode>
);
