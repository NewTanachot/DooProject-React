import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ActionProvider } from "./context/action";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ActionProvider>
      <App />
    </ActionProvider>
  </React.StrictMode>
);
