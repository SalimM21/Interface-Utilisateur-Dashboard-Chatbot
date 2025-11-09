---
title: Rasa project - quick run & test
---

Ce fichier décrit rapidement comment vérifier le bon fonctionnement local du projet Rasa contenu dans `chatbot_app/rasa_project`.

Prérequis
- Docker & Docker Compose installés et opérationnels
- PowerShell (Windows)

Démarrage des services

1. Depuis le dossier `dashboard-chatbot/interface_utilisateur` lancez les services Docker (compose) :

```powershell
docker compose up -d --build rasa rasa-actions
```

2. Vérifiez que les conteneurs sont up :

```powershell
docker compose ps
```

Vérifications rapides

- Statut Rasa (doit renvoyer le modèle chargé) :

```powershell
Invoke-RestMethod 'http://localhost:5005/status'
```

- Statut action server (doit être up sur le port 5055) :

```powershell
Invoke-RestMethod 'http://localhost:5055'
```

Test conversation (via webhook REST)

Un script PowerShell `test_rasa.ps1` est fourni pour exécuter automatiquement deux vérifications : /status et l'envoi d'un message de test sur `/webhooks/rest/webhook`.

Utilisation :

```powershell
cd chatbot_app/rasa_project
.\test_rasa.ps1
```

Que faire si ça échoue ?

- Consulter les logs : `docker compose logs -f rasa` et `docker compose logs -f rasa-actions`.
- Vérifier que `endpoints.yml` référence `http://rasa-actions:5055/webhook` et que `credentials.yml` contient au moins `rest: {}`.
- Si vous voulez persister les trackers en Mongo, ajuster `endpoints.yml` et ajouter la dépendance côté image Rasa (modules) — je peux automatiser ceci.

Prochaines améliorations recommandées
- Ajouter des `healthcheck` pour `rasa` et `rasa-actions` dans `docker-compose.yml`.
- Configurer le tracker store Mongo de façon persistante (si nécessaire).
- Ajouter un test end-to-end automatisé depuis l'API Gateway / Dashboard.

