import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { initKeycloak, getUserInfo } from "./authService";
import { lightTheme, darkTheme, applyTheme, toggleTheme } from "./theme";

import DashboardPage from "./DashboardPage";
import AlertsPage from "./AlertsPage";
import ReportsPage from "./ReportsPage";
import ChatbotWidget from "./ChatbotWidget";

/**
 * --------
 * Point d'entrée principal de l'application React
 * - Gestion auth Keycloak
 * - Gestion thème clair/sombre
 * - Routing pages
 * - Intégration Chatbot
 */

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [theme, setTheme] = useState("light");

  // Initialisation Keycloak
  useEffect(() => {
    initKeycloak().then((auth) => setAuthenticated(auth));
  }, []);

  // Appliquer le thème
  useEffect(() => {
    applyTheme(theme === "light" ? lightTheme : darkTheme);
  }, [theme]);

  if (!authenticated) return <div>Chargement de l’authentification...</div>;

  const user = getUserInfo();

  return (
    <Router>
      <div style={{ fontFamily: "var(--font-family)" }}>
        {/* Bouton toggle thème */}
        <div className="p-4">
          <button
            onClick={() => setTheme(toggleTheme(theme))}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {theme === "light" ? "🌙 Mode Sombre" : "☀️ Mode Clair"}
          </button>
        </div>

        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Chatbot intégré */}
        <ChatbotWidget />
      </div>
    </Router>
  );
}

export default App;
