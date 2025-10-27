# chatbot_routes.py
# -------------------
# Routes FastAPI pour proxy REST vers Rasa

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
import os

router = APIRouter(
    prefix="/chatbot",
    tags=["Chatbot"]
)

# -----------------------------
# Modèles
class ChatMessage(BaseModel):
    sender: str
    message: str

# -----------------------------
# Route proxy vers Rasa
@router.post("/message")
def send_message(message: ChatMessage):
    """
    Envoie le message utilisateur au serveur Rasa REST et retourne la réponse.
    """
    try:
        rasa_url = os.getenv("RASA_URL", "http://localhost:5005/webhooks/rest/webhook")
        payload = {
            "sender": message.sender,
            "message": message.message
        }
        response = requests.post(rasa_url, json=payload, timeout=5)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur communication avec Rasa: {e}")
