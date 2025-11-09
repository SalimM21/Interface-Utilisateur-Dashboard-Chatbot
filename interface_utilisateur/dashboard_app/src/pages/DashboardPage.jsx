import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import KPI_Cards from "../components/KPI_Cards";
import AlertsTable from "../components/AlertsTable";
import ScoreTrendsChart from "../components/ScoreTrendsChart";
import ExportButtons from "../components/ExportButtons";
import ChatbotWidget from "../components/ChatbotWidget";
import Loader from "../components/Loader";
import { Card, CardContent } from "../components/ui/card";

/**
 * -----------------
 * Page principale du tableau de bord interactif.
 * Contient :
 *  - En-tête (Header)
 *  - Menu latéral (Sidebar)
 *  - KPIs (taux de fraude, AUC, latence)
 *  - Graphiques et alertes
 *  - Boutons d’export
 *  - Chatbot intégré
 */

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Simulation de récupération des données depuis API
    setTimeout(() => {
      setKpis({
        tauxFraude: "2.4%",
        auc: "0.91",
        latence: "115ms",
      });

      setAlerts([
        { id: 1, type: "Fraude détectée", score: 0.95, date: "2025-10-25" },
        { id: 2, type: "Score anormalement bas", score: 0.32, date: "2025-10-26" },
      ]);

      setLoading(false);
    }, 1500);
  }, []);

  if (loading) return <Loader message="Chargement du tableau de bord..." />;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Barre latérale */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* En-tête */}
        <Header />

        {/* Contenu du tableau de bord */}
        <main className="p-6 space-y-6">
          {/* Section KPIs */}
          <KPI_Cards data={kpis} />

          {/* Graphique d’évolution des scores */}
          <ScoreTrendsChart />

          {/* Tableau des alertes */}
          <Card className="shadow-md rounded-2xl">
            <CardContent>
              <AlertsTable alerts={alerts} />
            </CardContent>
          </Card>

          {/* Boutons d'exportation */}
          <ExportButtons data={alerts} fileName="rapport_scores_alertes" />
        </main>
      </div>

      {/* Chatbot latéral */}
      <ChatbotWidget
        botUrl="http://localhost:8080/webchat"
        title="Assistant Scoring & Fraude"
      />
    </div>
  );
};

export default DashboardPage;
