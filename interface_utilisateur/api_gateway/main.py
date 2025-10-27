# -------------------
# FastAPI Gateway centralisant Dashboard & Chatbot

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import requests
import os

# -----------------------------
# Configuration FastAPI
app = FastAPI(title="Dashboard & Chatbot Gateway",
              description="API centralisée pour le dashboard React et le chatbot Rasa",
              version="1.0.0")

# Autoriser les requêtes depuis le frontend
origins = [
    "http://localhost:3000",  # React dev
    "http://localhost:5005",  # Rasa server
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Modèles de requêtes/réponses
class ScoreResponse(BaseModel):
    user_id: str
    score: float

class AlertResponse(BaseModel):
    user_id: str
    alerts: List[str]

class ReportRequest(BaseModel):
    user_id: str
    report_type: str = "pdf"
    date_range: Optional[str] = None

class ReportResponse(BaseModel):
    user_id: str
    report_link: str

# -----------------------------
# Endpoints Dashboard / API interne

# Exemple : récupérer le score
@app.get("/api/score/{user_id}", response_model=ScoreResponse)
def get_score(user_id: str):
    # Ici, logiques métier ou appel à microservice scoring
    try:
        # Simulé pour l'exemple
        score = 87.5
        return ScoreResponse(user_id=user_id, score=score)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Exemple : récupérer les alertes
@app.get("/api/alerts/{user_id}", response_model=AlertResponse)
def get_alerts(user_id: str):
    try:
        # Simulé pour l'exemple
        alerts = ["Transaction suspecte", "Connexion inhabituelle"]
        return AlertResponse(user_id=user_id, alerts=alerts)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Exemple : générer un rapport PDF/Excel
@app.post("/api/report/{user_id}", response_model=ReportResponse)
def generate_report(user_id: str, request: ReportRequest):
    try:
        # Simulé : renvoyer un lien fictif
        report_link = f"http://localhost:8000/reports/{user_id}_report.{request.report_type}"
        return ReportResponse(user_id=user_id, report_link=report_link)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# -----------------------------
# Endpoint Chatbot proxy vers Rasa
@app.post("/api/chatbot")
def proxy_chatbot(message: dict):
    try:
        rasa_url = os.getenv("RASA_URL", "http://localhost:5005/webhooks/rest/webhook")
        response = requests.post(rasa_url, json=message)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur communication Rasa: {e}")

# -----------------------------
# Endpoint test santé
@app.get("/health")
def health_check():
    return {"status": "ok"}
