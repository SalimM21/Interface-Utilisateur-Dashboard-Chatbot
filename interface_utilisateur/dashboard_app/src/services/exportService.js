import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

/**
 * Exporter des données en Excel
 * @param {Array} data - Liste d’objets JSON
 * @param {string} fileName - Nom du fichier
 */
export const exportToExcel = (data = [], fileName = "export") => {
  if (!data.length) {
    alert("Aucune donnée à exporter !");
    return;
  }

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data");
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};

/**
 * Exporter des données en PDF
 * @param {Array} data - Liste d’objets JSON
 * @param {string} fileName - Nom du fichier
 * @param {string} title - Titre du rapport
 */
export const exportToPDF = (data = [], fileName = "export", title = "Rapport") => {
  if (!data.length) {
    alert("Aucune donnée à exporter !");
    return;
  }

  const doc = new jsPDF();
  doc.text(title, 14, 15);

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
