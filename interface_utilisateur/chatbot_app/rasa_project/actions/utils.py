# ----------
# Fonctions utilitaires pour formatage de données et réponses chatbot

from datetime import datetime

# -----------------------------
# Formater un score avec 2 décimales
def format_score(score: float) -> str:
    try:
        return f"{score:.2f}"
    except Exception as e:
        print(f"Error formatting score: {e}")
        return str(score)

# -----------------------------
# Formater un pourcentage
def format_percentage(value: float) -> str:
    try:
        return f"{value*100:.2f}%"
    except Exception as e:
        print(f"Error formatting percentage: {e}")
        return str(value)

# -----------------------------
# Formater un délai ou temps en secondes vers hh:mm:ss
def format_time(seconds: float) -> str:
    try:
        h = int(seconds // 3600)
        m = int((seconds % 3600) // 60)
        s = int(seconds % 60)
        return f"{h:02d}:{m:02d}:{s:02d}"
    except Exception as e:
        print(f"Error formatting time: {e}")
        return str(seconds)

# -----------------------------
# Formater une date ISO vers jj/mm/aaaa
def format_date(iso_date: str) -> str:
    try:
        dt = datetime.fromisoformat(iso_date)
        return dt.strftime("%d/%m/%Y")
    except Exception as e:
        print(f"Error formatting date: {e}")
        return iso_date

# -----------------------------
# Construire un message listé (pour alertes ou rapports)
def format_list_message(items: list) -> str:
    try:
        if not items:
            return "Aucun élément à afficher."
        return "\n".join([f"- {str(item)}" for item in items])
    except Exception as e:
        print(f"Error formatting list: {e}")
        return str(items)

# -----------------------------
# Exemple d’usage pour le chatbot
if __name__ == "__main__":
    print(format_score(1234.5678))           # "1234.57"
    print(format_percentage(0.8532))         # "85.32%"
    print(format_time(3671))                 # "01:01:11"
    print(format_date("2025-10-27T12:34:56"))# "27/10/2025"
    print(format_list_message(["Alerte 1", "Alerte 2"]))
