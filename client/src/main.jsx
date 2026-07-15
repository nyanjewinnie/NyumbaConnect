import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";

import { HouseProvider } from "./context/HouseContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <HouseProvider>

      <BrowserRouter>

        <App />

      </BrowserRouter>

    </HouseProvider>

  </StrictMode>
);