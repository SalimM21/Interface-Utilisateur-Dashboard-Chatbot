import React from "react";
import { Button } from "./ui/button";
import { FileSpreadsheet, FileText } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

/**
 * Composant d'exportation des données
 * Permet de générer des exports en PDF et Excel depuis les données du tableau de bord
 *
 * @param {Array} data - Données à exporter
 * @param {string} fileName - Nom de base du fichier exporté
 */
const ExportButtons = ({ data = [], fileName = "dashboard_export" }) => {
  const exportToExcel = () => {
    if (data.length === 0) return alert("Aucune donnée à exporter !");
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  const exportToPDF = () => {
    if (data.length === 0) return alert("Aucune donnée à exporter !");
    const doc = new jsPDF();
    doc.text("Rapport - Scores et Alertes", 14, 15);
    const headers = Object.keys(data[0]);
    const rows = data.map((obj) => headers.map((h) => obj[h]));
    doc.autoTable({
      startY: 25,
      head: [headers],
      body: rows,
      theme: "grid",
      styles: { fontSize: 10 },
    });
    doc.save(`${fileName}.pdf`);
  };

  return (
    <div className="flex gap-4 mt-4">
      <Button
        onClick={exportToExcel}
        className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-2 shadow-md"
      >
        <FileSpreadsheet className="mr-2 w-4 h-4" />
        Exporter Excel
      </Button>

      <Button
        onClick={exportToPDF}
        className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 py-2 shadow-md"
      >
        <FileText className="mr-2 w-4 h-4" />
        Exporter PDF
      </Button>
    </div>
  );
};

export default ExportButtons;
