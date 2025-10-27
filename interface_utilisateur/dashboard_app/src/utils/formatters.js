/**
 * -------------
 * Fonctions utilitaires pour formater les données
 * Exemple : pourcentage, temps, score, date
 */

/**
 * Formate un nombre en pourcentage
 * @param {number} value - valeur décimale (ex: 0.92)
 * @param {number} decimals - nombre de décimales à afficher
 * @returns {string} - "92.0%"
 */
export const formatPercentage = (value, decimals = 1) => {
  if (typeof value !== "number") return "-";
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Formate un temps en millisecondes vers "xx ms" ou "x s"
 * @param {number} ms
 * @returns {string}
 */
export const formatLatency = (ms) => {
  if (typeof ms !== "number") return "-";
  if (ms < 1000) return `${ms} ms`;
  return `${(ms / 1000).toFixed(2)} s`;
};

/**
 * Formate un score compris entre 0 et 1 en échelle 0-100
 * @param {number} score
 * @returns {string}
 */
export const formatScore = (score) => {
  if (typeof score !== "number") return "-";
  return (score * 100).toFixed(1);
};

/**
 * Formate une date au format "JJ/MM/YYYY"
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDate = (date) => {
  const d = new Date(date);
  if (isNaN(d)) return "-";
  return `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1
  ).padStart(2, "0")}/${d.getFullYear()}`;
};

/**
 * Formate une valeur monétaire en euros
 * @param {number} value
 * @returns {string}
 */
export const formatCurrency = (value) => {
  if (typeof value !== "number") return "-";
  return `${value.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  })}`;
};
