# -------------------
# Centralisation des variables d'environnement et URLs APIs internes

import os

# -----------------------------
# FastAPI backend
FASTAPI_HOST = os.getenv("FASTAPI_HOST", "0.0.0.0")
FASTAPI_PORT = int(os.getenv("FASTAPI_PORT", 8000))

# -----------------------------
# Rasa chatbot
RASA_URL = os.getenv("RASA_URL", "http://localhost:5005/webhooks/rest/webhook")

# -----------------------------
# Dashboard
DASHBOARD_FRONTEND_URL = os.getenv("DASHBOARD_FRONTEND_URL", "http://localhost:3000")

# -----------------------------
# Microservices internes
SCORING_API_URL = os.getenv("SCORING_API_URL", "http://localhost:8001/api")
ALERTS_API_URL = os.getenv("ALERTS_API_URL", "http://localhost:8002/api")
REPORT_API_URL = os.getenv("REPORT_API_URL", "http://localhost:8003/api")

# -----------------------------
# Auth / Keycloak
KEYCLOAK_SERVER = os.getenv("KEYCLOAK_SERVER", "http://localhost:8080")
KEYCLOAK_REALM = os.getenv("KEYCLOAK_REALM", "myrealm")
KEYCLOAK_CLIENT_ID = os.getenv("KEYCLOAK_CLIENT_ID", "myclient")
KEYCLOAK_CLIENT_SECRET = os.getenv("KEYCLOAK_CLIENT_SECRET", "mysecret")

# -----------------------------
# MongoDB Tracker (Rasa)
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
MONGO_DB = os.getenv("MONGO_DB", "rasa_db")
MONGO_USER = os.getenv("MONGO_USER", "rasa_user")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD", "rasa_password")
MONGO_AUTH_SOURCE = os.getenv("MONGO_AUTH_SOURCE", "admin")
