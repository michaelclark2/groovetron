import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RadioBrowserProvider } from "./context/RadioBrowserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RadioBrowserProvider>
      <App />
    </RadioBrowserProvider>
  </StrictMode>
);
