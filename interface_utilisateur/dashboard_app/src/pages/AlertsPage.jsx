import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AlertsTable from "../components/AlertsTable";
import Loader from "../components/Loader";

/**
 * --------------
 * Page dédiée aux alertes.
 * Fonctionnalités :
 *  - Affichage détaillé des alertes
 *  - Filtres par gravité (high, medium, low)
 *  - Barre de recherche par type
 */

const AlertsPage = () => {
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [search, setSearch] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("all");

  useEffect(() => {
    // Simulation récupération des alertes
    setTimeout(() => {
      setAlerts([
        { id: 1, type: "Fraude détectée", score: 0.95, severity: "high", date: "2025-10-25" },
        { id: 2, type: "Score faible", score: 0.32, severity: "medium", date: "2025-10-26" },
        { id: 3, type: "Nouvelle transaction", score: 0.68, severity: "low", date: "2025-10-26" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity;
    const matchesSearch = alert.type.toLowerCase().includes(search.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  if (loading) return <Loader message="Chargement des alertes..." />;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold">🔔 Gestion des Alertes</h2>

          {/* Filtres */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Rechercher par type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-lg w-full sm:w-1/3"
            />
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">Toutes gravités</option>
              <option value="high">Élevée</option>
              <option value="medium">Moyenne</option>
              <option value="low">Faible</option>
            </select>
          </div>

          {/* Tableau des alertes filtré */}
          <AlertsTable alerts={filteredAlerts} />
        </main>
      </div>
    </div>
  );
};

export default AlertsPage;
