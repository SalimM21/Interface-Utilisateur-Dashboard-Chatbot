# -------------------
# Routes FastAPI pour authentification et refresh token via Keycloak

from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
import requests
import os
from typing import Optional

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

# -----------------------------
# Modèles
class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    expires_in: int
    token_type: str

class LoginRequest(BaseModel):
    username: str
    password: str

class RefreshRequest(BaseModel):
    refresh_token: str

# -----------------------------
# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# -----------------------------
# Config Keycloak
KEYCLOAK_SERVER = os.getenv("KEYCLOAK_SERVER", "http://localhost:8080")
KEYCLOAK_REALM = os.getenv("KEYCLOAK_REALM", "myrealm")
KEYCLOAK_CLIENT_ID = os.getenv("KEYCLOAK_CLIENT_ID", "myclient")
KEYCLOAK_CLIENT_SECRET = os.getenv("KEYCLOAK_CLIENT_SECRET", "mysecret")

# -----------------------------
# Login utilisateur (Resource Owner Password Credentials)
@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest):
    token_url = f"{KEYCLOAK_SERVER}/realms/{KEYCLOAK_REALM}/protocol/openid-connect/token"
    payload = {
        "grant_type": "password",
        "client_id": KEYCLOAK_CLIENT_ID,
        "client_secret": KEYCLOAK_CLIENT_SECRET,
        "username": request.username,
        "password": request.password
    }
    try:
        r = requests.post(token_url, data=payload)
        r.raise_for_status()
        return r.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=401, detail=f"Authentification échouée: {e}")

# -----------------------------
# Refresh token
@router.post("/refresh", response_model=TokenResponse)
def refresh_token(request: RefreshRequest):
    token_url = f"{KEYCLOAK_SERVER}/realms/{KEYCLOAK_REALM}/protocol/openid-connect/token"
    payload = {
        "grant_type": "refresh_token",
        "client_id": KEYCLOAK_CLIENT_ID,
        "client_secret": KEYCLOAK_CLIENT_SECRET,
        "refresh_token": request.refresh_token
    }
    try:
        r = requests.post(token_url, data=payload)
        r.raise_for_status()
        return r.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=401, detail=f"Refresh token échoué: {e}")

# -----------------------------
# Dépendance pour sécuriser les routes
def get_current_user(token: str = Depends(oauth2_scheme)):
    # Ici, vérification du JWT (decode + validation)
    # Exemple simple : retourner token pour test
    return {"token": token}
