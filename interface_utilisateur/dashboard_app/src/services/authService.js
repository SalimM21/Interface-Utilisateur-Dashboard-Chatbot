import Keycloak from "keycloak-js";

// Configuration Keycloak
const keycloakConfig = {
  url: process.env.REACT_APP_KEYCLOAK_URL || "http://localhost:8080/auth",
  realm: process.env.REACT_APP_KEYCLOAK_REALM || "myrealm",
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || "dashboard-client",
};

// Instance Keycloak
const keycloak = new Keycloak(keycloakConfig);

/**
 * Initialise Keycloak et récupère le token JWT
 * @returns {Promise<boolean>} true si authentifié
 */
export const initKeycloak = () => {
  return new Promise((resolve, reject) => {
    keycloak
      .init({ onLoad: "login-required", checkLoginIframe: false })
      .then((authenticated) => {
        if (authenticated) {
          localStorage.setItem("authToken", keycloak.token);
          setupTokenRefresh();
        }
        resolve(authenticated);
      })
      .catch((err) => reject(err));
  });
};

/**
 * Rafraîchit automatiquement le token avant expiration
 */
const setupTokenRefresh = () => {
  setInterval(() => {
    keycloak.updateToken(60) // rafraîchir si moins de 60s avant expiration
      .then((refreshed) => {
        if (refreshed) {
          console.log("Token rafraîchi");
          localStorage.setItem("authToken", keycloak.token);
        }
      })
      .catch(() => {
        console.warn("Impossible de rafraîchir le token, déconnexion");
        logout();
      });
  }, 5000);
};

/**
 * Déconnexion
 */
export const logout = () => {
  localStorage.removeItem("authToken");
  keycloak.logout({ redirectUri: window.location.origin });
};

/**
 * Récupère les informations utilisateur (nom, email, rôles)
 */
export const getUserInfo = () => {
  if (!keycloak.authenticated) return null;
  return {
    username: keycloak.tokenParsed?.preferred_username,
    email: keycloak.tokenParsed?.email,
    roles: keycloak.tokenParsed?.realm_access?.roles || [],
  };
};

/**
 * Vérifie si l’utilisateur possède un rôle spécifique
 * @param {string} role
 * @returns {boolean}
 */
export const hasRole = (role) => {
  return getUserInfo()?.roles.includes(role);
};

export default keycloak;
