import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ExportButtons from "./ExportButtons";
import Loader from "./Loader";

/**
 * ----------------
 * Page dédiée aux rapports et export.
 * Fonctionnalités :
 *  - Affichage des données à exporter
 *  - Boutons d'export PDF et Excel
 *  - Filtrage optionnel avant export
 */

const ReportsPage = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    // Simulation de récupération des données
    setTimeout(() => {
      setReportData([
        { date: "2025-10-25", score: 0.92, alert: "Fraude détectée" },
        { date: "2025-10-26", score: 0.67, alert: "Score faible" },
        { date: "2025-10-26", score: 0.81, alert: "Nouvelle transaction" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Loader message="Chargement des rapports..." />;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold">📑 Rapports & Export</h2>

          <p className="text-gray-600 mb-4">
            Exportez les données de scoring et d’alertes en PDF ou Excel pour analyse.
          </p>

          {/* Aperçu des données */}
          <div className="overflow-x-auto border rounded-lg shadow-md bg-white p-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Score</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Alerte</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reportData.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{row.date}</td>
                    <td className="px-4 py-2">{(row.score * 100).toFixed(1)}%</td>
                    <td className="px-4 py-2">{row.alert}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Boutons d'export */}
          <ExportButtons data={reportData} fileName="rapport_scores_alertes" />
        </main>
      </div>
    </div>
  );
};

export default ReportsPage;
