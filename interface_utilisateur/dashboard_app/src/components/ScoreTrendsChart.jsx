import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ScoreTrendsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulation de récupération des données depuis l’API
    fetch("/api/score_trends")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(() => {
        // Données factices de secours
        setData([
          { date: "2025-10-21", score_moyen: 0.72, score_max: 0.91 },
          { date: "2025-10-22", score_moyen: 0.75, score_max: 0.89 },
          { date: "2025-10-23", score_moyen: 0.68, score_max: 0.88 },
          { date: "2025-10-24", score_moyen: 0.79, score_max: 0.94 },
          { date: "2025-10-25", score_moyen: 0.81, score_max: 0.95 },
          { date: "2025-10-26", score_moyen: 0.77, score_max: 0.93 },
        ]);
      });
  }, []);

  return (
    <Card className="mt-6 shadow-lg rounded-2xl">
      <CardHeader>
        <h2 className="text-xl font-semibold">📈 Évolution des Scores</h2>
        <p className="text-sm text-gray-500">
          Tendance des scores moyens et maximaux sur la période récente
        </p>
      </CardHeader>

      <CardContent>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 1]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
              <Tooltip
                formatter={(value) => `${(value * 100).toFixed(1)}%`}
                labelFormatter={(label) => `📅 ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="score_moyen"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
                name="Score Moyen"
              />
              <Line
                type="monotone"
                dataKey="score_max"
                stroke="#16a34a"
                strokeWidth={2}
                dot={false}
                name="Score Max"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreTrendsChart;
