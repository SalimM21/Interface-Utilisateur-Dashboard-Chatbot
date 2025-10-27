// 📊 Composants affichant les KPIs : taux de fraude, AUC, latence moyenne

import React from "react";
import { Activity, Gauge, Clock } from "lucide-react";
import { motion } from "framer-motion";

const KPI_Cards = ({ data }) => {
  // Valeurs par défaut si aucun data n’est encore reçu
  const { fraudRate = 0.0, auc = 0.0, latency = 0.0 } = data || {};

  const kpiList = [
    {
      title: "Taux de Fraude",
      value: `${fraudRate.toFixed(2)} %`,
      icon: <Activity size={28} />,
      color: "bg-red-100 text-red-700 border-red-300",
      description: "Transactions suspectes détectées",
    },
    {
      title: "AUC Modèle",
      value: auc.toFixed(3),
      icon: <Gauge size={28} />,
      color: "bg-blue-100 text-blue-700 border-blue-300",
      description: "Performance du modèle de scoring",
    },
    {
      title: "Latence Moyenne",
      value: `${latency.toFixed(2)} ms`,
      icon: <Clock size={28} />,
      color: "bg-green-100 text-green-700 border-green-300",
      description: "Temps moyen de réponse API",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full mt-4">
      {kpiList.map((kpi, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`flex flex-col justify-between border rounded-2xl p-6 shadow-sm ${kpi.color} transition-transform hover:scale-105`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              {kpi.icon}
              <h3 className="text-lg font-semibold">{kpi.title}</h3>
            </div>
          </div>
          <div className="text-3xl font-bold mb-2">{kpi.value}</div>
          <p className="text-sm text-gray-600">{kpi.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default KPI_Cards;
