/**
 * -------------
 * Variables globales et constantes pour l'application
 */

// 🔗 URLs API
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";
export const KPI_ENDPOINT = "/kpis";
export const ALERTS_ENDPOINT = "/alerts";
export const SCORES_TRENDS_ENDPOINT = "/scores/trends";
export const REPORTS_ENDPOINT = "/reports";
export const TRANSACTIONS_ENDPOINT = "/transactions";

// 🎨 Couleurs du dashboard (Tailwind / custom)
export const COLORS = {
  primary: "#3b82f6", // bleu
  secondary: "#facc15", // jaune
  success: "#16a34a", // vert
  danger: "#dc2626", // rouge
  warning: "#f59e0b", // orange
  info: "#0ea5e9", // cyan
  background: "#f9fafb", // gris clair
  textPrimary: "#111827",
  textSecondary: "#6b7280",
};

// ⚠️ Seuils d’alerte
export const ALERT_THRESHOLDS = {
  fraudScoreHigh: 0.9, // au-dessus = alerte élevée
  fraudScoreMedium: 0.7, // entre medium et high
  lowLatencyMs: 100, // en dessous = ok
  highLatencyMs: 500, // au-dessus = alerte
};

// 🕒 Paramètres divers
export const DEFAULT_TIMEOUT_MS = 10000; // 10 secondes pour API
export const DATE_FORMAT = "DD/MM/YYYY";

// 📝 Autres constantes
export const EXPORT_FILE_NAME = "rapport_scores_alertes";

