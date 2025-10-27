import axios from "axios";

// Création d'une instance Axios avec configuration globale
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api",
  timeout: 10000, // 10 secondes
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur de requêtes pour ajouter le token si disponible
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur de réponses pour gestion centralisée des erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * API Scoring / Fraude
 */

// Récupérer les KPIs
export const fetchKPIs = async () => {
  const response = await apiClient.get("/kpis");
  return response.data;
};

// Récupérer les alertes
export const fetchAlerts = async () => {
  const response = await apiClient.get("/alerts");
  return response.data;
};

// Récupérer les tendances de scores
export const fetchScoreTrends = async () => {
  const response = await apiClient.get("/scores/trends");
  return response.data;
};

// Envoyer une transaction pour scoring
export const sendTransaction = async (transaction) => {
  const response = await apiClient.post("/transactions", transaction);
  return response.data;
};

// Récupérer un rapport filtré
export const fetchReport = async (params) => {
  const response = await apiClient.get("/reports", { params });
  return response.data;
};

export default apiClient;
