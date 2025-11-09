import Keycloak from 'keycloak-js';

// Configuration Keycloak
const keycloak = new Keycloak({
    url: 'http://localhost:8080/auth',
    realm: 'scoring-platform',
    clientId: 'scoring-dashboard'
});

// Initialisation du client Keycloak
export const initKeycloak = async () => {
    try {
        const auth = await keycloak.init({
            onLoad: 'login-required'
        });
        return auth;
    } catch (error) {
        console.error('Failed to initialize Keycloak:', error);
        return false;
    }
};

// Récupérer les infos de l'utilisateur connecté
export const getUserInfo = () => {
    if (keycloak.authenticated) {
        return {
            username: keycloak.tokenParsed.preferred_username,
            email: keycloak.tokenParsed.email,
            roles: keycloak.realmAccess.roles
        };
    }
    return null;
};

// Déconnexion
export const logout = () => {
    keycloak.logout();
};

// Token pour les appels API
export const getToken = () => {
    return keycloak.token;
};