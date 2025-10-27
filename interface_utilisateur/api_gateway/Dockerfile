# Utiliser l'image officielle Python 3.12 slim
FROM python:3.12-slim

# Définit le répertoire de travail
WORKDIR /app

# Copie des fichiers requirements et installation des dépendances
COPY interface_utilisateur/api_gateway/requirements.txt .

# Met à jour pip et installe les dépendances
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copie le code source de l'API Gateway
COPY interface_utilisateur/api_gateway/ .

# Expose le port pour FastAPI
EXPOSE 8000

# Commande pour lancer l'application FastAPI via Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
