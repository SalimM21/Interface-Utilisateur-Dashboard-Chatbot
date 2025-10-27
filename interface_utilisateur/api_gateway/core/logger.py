# -------------------
# Logging centralisé pour FastAPI, Dashboard et Chatbot

import logging
import sys
from logging.handlers import RotatingFileHandler
import os

# -----------------------------
# Configuration du répertoire de logs
LOG_DIR = os.getenv("LOG_DIR", "./logs")
os.makedirs(LOG_DIR, exist_ok=True)
LOG_FILE = os.path.join(LOG_DIR, "app.log")

# -----------------------------
# Création du logger
logger = logging.getLogger("app_logger")
logger.setLevel(logging.DEBUG)

# Format des logs
formatter = logging.Formatter(
    "[%(asctime)s] [%(levelname)s] [%(name)s] [%(filename)s:%(lineno)d] - %(message)s"
)

# Handler fichier (rotation 5MB, 5 backups)
file_handler = RotatingFileHandler(LOG_FILE, maxBytes=5*1024*1024, backupCount=5)
file_handler.setFormatter(formatter)
file_handler.setLevel(logging.INFO)

# Handler console
console_handler = logging.StreamHandler(sys.stdout)
console_handler.setFormatter(formatter)
console_handler.setLevel(logging.DEBUG)

# Ajouter les handlers au logger
logger.addHandler(file_handler)
logger.addHandler(console_handler)

# -----------------------------
# Fonctions utilitaires
def log_info(message: str):
    logger.info(message)

def log_debug(message: str):
    logger.debug(message)

def log_error(message: str):
    logger.error(message)
