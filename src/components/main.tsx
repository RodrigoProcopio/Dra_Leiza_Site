import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import "./i18n";
import "./styles/globals.css";
import App from "./app/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
