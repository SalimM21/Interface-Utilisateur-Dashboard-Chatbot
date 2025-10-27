# actions.py
# -----------
# Actions personnalisées pour le chatbot Rasa
# Appels aux APIs backend pour scoring, alertes et rapports

from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import requests

# -----------------------------
# Configuration des URLs API
API_BASE_URL = "http://localhost:8000/api"  # Adapter selon ton backend
SCORE_URL = f"{API_BASE_URL}/score"
ALERTS_URL = f"{API_BASE_URL}/alerts"
REPORT_URL = f"{API_BASE_URL}/report"

# -----------------------------
# Action : récupérer le score utilisateur
class ActionGetScore(Action):

    def name(self) -> Text:
        return "action_get_score"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        user_id = tracker.sender_id  # ID utilisateur fourni par Rasa
        try:
            response = requests.get(f"{SCORE_URL}/{user_id}")
            response.raise_for_status()
            score = response.json().get("score", "inconnu")
            dispatcher.utter_message(text=f"Votre score actuel est : {score}")
        except Exception as e:
            dispatcher.utter_message(text="Désolé, je n'ai pas pu récupérer votre score.")
            print(f"Error fetching score: {e}")

        return []

# -----------------------------
# Action : récupérer les alertes utilisateur
class ActionGetAlerts(Action):

    def name(self) -> Text:
        return "action_get_alerts"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        user_id = tracker.sender_id
        try:
            response = requests.get(f"{ALERTS_URL}/{user_id}")
            response.raise_for_status()
            alerts = response.json().get("alerts", [])
            if alerts:
                messages = "\n".join([f"- {a}" for a in alerts])
                dispatcher.utter_message(text=f"Voici vos alertes :\n{messages}")
            else:
                dispatcher.utter_message(text="Aucune alerte pour le moment.")
        except Exception as e:
            dispatcher.utter_message(text="Désolé, je n'ai pas pu récupérer vos alertes.")
            print(f"Error fetching alerts: {e}")

        return []

# -----------------------------
# Action : générer un rapport utilisateur (PDF/Excel)
class ActionGenerateReport(Action):

    def name(self) -> Text:
        return "action_generate_report"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        user_id = tracker.sender_id
        try:
            response = requests.post(f"{REPORT_URL}/{user_id}", json={"format": "pdf"})
            response.raise_for_status()
            report_link = response.json().get("link")
            if report_link:
                dispatcher.utter_message(text=f"Votre rapport est prêt : {report_link}")
            else:
                dispatcher.utter_message(text="Le rapport n'a pas pu être généré.")
        except Exception as e:
            dispatcher.utter_message(text="Désolé, impossible de générer le rapport pour le moment.")
            print(f"Error generating report: {e}")

        return []
