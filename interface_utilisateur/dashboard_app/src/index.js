import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import global CSS
import "./dashboard.css";

// React 18 - création du root
const root = ReactDOM.createRoot(document.getElementById("root"));

// Montage de l'application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
