import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RadioBrowserProvider } from "./context/RadioBrowserContext.tsx";
import { UserContextProvider } from "./context/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserContextProvider>
      <RadioBrowserProvider>
        <App />
      </RadioBrowserProvider>
    </UserContextProvider>
  </StrictMode>
);
