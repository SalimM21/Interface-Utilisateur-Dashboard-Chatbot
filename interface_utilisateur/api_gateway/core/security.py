# security.py
# -------------------
# Vérification JWT / OAuth2 pour FastAPI avec Keycloak

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
import os

# -----------------------------
# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# -----------------------------
# Config Keycloak / JWT
KEYCLOAK_SERVER = os.getenv("KEYCLOAK_SERVER", "http://localhost:8080")
KEYCLOAK_REALM = os.getenv("KEYCLOAK_REALM", "myrealm")
KEYCLOAK_CLIENT_ID = os.getenv("KEYCLOAK_CLIENT_ID", "myclient")
KEYCLOAK_PUBLIC_KEY = os.getenv("KEYCLOAK_PUBLIC_KEY", "")  # PEM ou fetch depuis Keycloak

ALGORITHM = "RS256"

# -----------------------------
# Fonction de décodage et vérification du JWT
def verify_jwt(token: str):
    try:
        # Décoder le JWT avec la clé publique de Keycloak
        payload = jwt.decode(token, KEYCLOAK_PUBLIC_KEY, algorithms=[ALGORITHM], audience=KEYCLOAK_CLIENT_ID)
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token invalide ou expiré",
            headers={"WWW-Authenticate": "Bearer"},
        )

# -----------------------------
# Dépendance FastAPI pour sécuriser les routes
def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_jwt(token)
    # Extrait les informations utilisateur utiles
    user = {
        "username": payload.get("preferred_username"),
        "email": payload.get("email"),
        "roles": payload.get("realm_access", {}).get("roles", [])
    }
    return user
