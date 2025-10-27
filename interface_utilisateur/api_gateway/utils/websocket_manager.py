# websocket_manager.py
# -------------------
# Gestion du canal WebSocket pour communication temps réel
# entre le Chatbot (Rasa) et le Dashboard

from fastapi import WebSocket, WebSocketDisconnect
from typing import List
from logger import log_info, log_error

class ConnectionManager:
    """
    Gère les connexions WebSocket.
    """
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        log_info(f"Nouvelle connexion WebSocket : {websocket.client}")

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            log_info(f"Déconnexion WebSocket : {websocket.client}")

    async def send_personal_message(self, message: str, websocket: WebSocket):
        try:
            await websocket.send_text(message)
        except Exception as e:
            log_error(f"Erreur envoi message WebSocket : {e}")

    async def broadcast(self, message: str):
        """
        Diffuse un message à toutes les connexions actives.
        """
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception as e:
                log_error(f"Erreur broadcast WebSocket : {e}")


# -----------------------------
# Instance globale à importer dans main.py ou routes
manager = ConnectionManager()
