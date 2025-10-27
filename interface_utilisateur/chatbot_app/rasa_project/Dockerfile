# Dockerfile Rasa Chatbot
# -----------------------

# Étape 1 : Base Python
FROM python:3.11-slim

# Mainteneur
LABEL maintainer="votre.email@example.com"

# Variables d'environnement
ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    LANG=C.UTF-8 \
    LC_ALL=C.UTF-8

# Répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY requirements.txt ./
COPY credentials.yml ./
COPY endpoints.yml ./
COPY config.yml ./
COPY domain.yml ./
COPY actions.py ./
COPY nlu_fr.yml ./nlu_fr.yml
COPY nlu_en.yml ./nlu_en.yml
COPY stories.yml ./stories.yml
COPY rules.yml ./rules.yml
COPY utils.py ./

# Installer les dépendances Python
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Exposer les ports
# 5005 : serveur Rasa principal
# 5055 : serveur d'actions
EXPOSE 5005 5055

# Commande pour lancer Rasa avec le serveur d'action
CMD ["rasa", "run", "--enable-api", "--cors", "*", "--debug"]
