import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

const AlertsTable = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Simulation de récupération des alertes depuis l’API
    fetch("/api/alerts")
      .then((res) => res.json())
      .then((data) => setAlerts(data))
      .catch(() => {
        // Données de test fallback
        setAlerts([
          {
            id: 1,
            type: "Fraude détectée",
            score: 0.92,
            severity: "high",
            date: "2025-10-25 14:30",
          },
          {
            id: 2,
            type: "Score anormalement bas",
            score: 0.12,
            severity: "medium",
            date: "2025-10-25 10:12",
          },
          {
            id: 3,
            type: "Nouvelle transaction analysée",
            score: 0.65,
            severity: "low",
            date: "2025-10-24 18:40",
          },
        ]);
      });
  }, []);

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="text-red-500" />;
      case "medium":
        return <Clock className="text-yellow-500" />;
      default:
        return <CheckCircle className="text-green-500" />;
    }
  };

  const getSeverityLabel = (severity) => {
    switch (severity) {
      case "high":
        return "Élevée";
      case "medium":
        return "Moyenne";
      default:
        return "Faible";
    }
  };

  return (
    <Card className="mt-6 shadow-lg rounded-2xl">
      <CardHeader>
        <h2 className="text-xl font-semibold">🔔 Alertes Détectées</h2>
        <p className="text-sm text-gray-500">Dernières alertes issues du moteur de scoring</p>
      </CardHeader>
      <CardContent>
        <Table className="min-w-full border">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-semibold">Type</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Gravité</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow
                key={alert.id}
                className={`hover:bg-gray-50 ${
                  alert.severity === "high"
                    ? "border-l-4 border-red-500"
                    : alert.severity === "medium"
                    ? "border-l-4 border-yellow-500"
                    : "border-l-4 border-green-500"
                }`}
              >
                <TableCell className="flex items-center gap-2">
                  {getSeverityIcon(alert.severity)}
                  {alert.type}
                </TableCell>
                <TableCell>{(alert.score * 100).toFixed(1)}%</TableCell>
                <TableCell>{getSeverityLabel(alert.severity)}</TableCell>
                <TableCell>{alert.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AlertsTable;
