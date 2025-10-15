# 🤖 Interface Utilisateur — Dashboard + Chatbot

## 🧩 Description

Ce module fournit une **interface utilisateur complète** pour la plateforme de scoring/fraude.  
Il regroupe :

1. **Dashboard interactif** (User Story 5.1)
   - Visualisation des scores, alertes et KPIs (fraude, AUC, latence)
   - Export PDF/Excel
2. **Chatbot conversationnel** (User Story 5.2)
   - Interaction via Rasa ou Botpress
   - Intents : demander score, alerte, rapport
   - Multilingue (FR/EN)
3. **Intégration Dashboard + Chatbot** (User Story 5.3)
   - Chatbot accessible depuis le dashboard
   - Synchronisation des filtres et du contexte
   - Communication en temps réel via WebSocket
4. **Monitoring**
   - Metrics et logs centralisés avec Prometheus, Grafana et Loki

---

## 🏗️ Architecture
```mermaid
flowchart LR
    %% === Dashboard ===
    subgraph Dashboard["🖥️ Dashboard"]
        D1[Composants React / Streamlit]
        D2[KPIs / Alertes / Graphiques]
        D3[Chatbot Widget]
    end

    %% === Chatbot ===
    subgraph Chatbot["🤖 Chatbot (Rasa / Botpress)"]
        C1[Intents FR/EN]
        C2[Stories / Flows]
        C3[Actions / API Calls]
    end

    %% === API Gateway ===
    subgraph Gateway["🌐 API Gateway (FastAPI)"]
        G1[Routes Dashboard / Chatbot]
        G2[WebSocket & Auth]
        G3[Logging]
    end

    %% === Backend ===
    subgraph Backend["🏦 Backend Services"]
        B1[Scoring API]
        B2[Fraude API]
        B3[Auth / Keycloak]
    end

    %% === Monitoring ===
    subgraph Monitoring["📊 Monitoring & Logs"]
        M1[Prometheus Metrics]
        M2[Grafana Dashboards]
        M3[Loki Logs]
    end

    %% === Flux
    D1 -->|API Calls| G1
    D2 -->|API Calls| G1
    D3 -->|Messages| G1

    C3 -->|API Calls| B1
    C3 -->|API Calls| B2
    C3 -->|Auth| B3

    G1 --> B1
    G1 --> B2
    G1 --> B3
    G2 --> C3

    %% Monitoring connections
    D1 --> M1
    D2 --> M1
    D3 --> M1
    G1 --> M1
    G2 --> M1
    B1 --> M1
    B2 --> M1
    B3 --> M1

    G1 --> M3
    B1 --> M3
    B2 --> M3
    B3 --> M3

    M1 --> M2
    M3 --> M2
```
---

## ♻️ Flux globale du Module 
```mermaid
flowchart LR
    %% === Utilisateurs ===
    U[👤 Analyst / Admin / Viewer]

    %% === Frontend & Chatbot ===
    subgraph FrontendLayer["Frontend & Chatbot"]
        A[🖥️ Dashboard\nReact / Streamlit]
        C[💬 Chatbot\nRasa / Botpress]
    end

    %% === API Gateway ===
    B[API Gateway FastAPI]

    %% === Backend Services ===
    subgraph BackendLayer["Backend Services"]
        D[Backend Scoring & Fraud APIs]
        E[Auth / Keycloak OAuth2]
        F[WebSocket ↔ Chatbot & Dashboard]
    end

    %% === Monitoring & Logging ===
    subgraph MonitoringLayer["📊 Monitoring & Logging"]
        G[Prometheus Metrics] --> H[Grafana Dashboards]
        I[Loki Logs]
        J[Logs vers ELK]
    end

    %% === Connections ===
    U -->|API Calls| A
    U -->|API Calls| C
    A --> B
    C --> B
    B --> D
    B --> E
    B --> F
    B --> G
    A --> G
    C --> G
    B --> I
    D --> J
    F --> J

```

---
## 📁 Arborescence complète — Interface Utilisateur (Dashboard + Chatbot)
```bash
interface_utilisateur/
│
├── dashboard_app/                          # 🧭 Application de visualisation (User Story 5.1)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx                  # Barre supérieure avec logo, navigation, langue
│   │   │   ├── Sidebar.jsx                 # Menu latéral (accès aux sections : Scores, Alertes, KPIs)
│   │   │   ├── KPI_Cards.jsx               # Composants affichant taux de fraude, AUC, latence
│   │   │   ├── AlertsTable.jsx             # Tableau listant les alertes détectées
│   │   │   ├── ScoreTrendsChart.jsx        # Graphique d’évolution des scores dans le temps
│   │   │   ├── ExportButtons.jsx           # Boutons d’export PDF/Excel
│   │   │   ├── ChatbotWidget.jsx           # Intégration du chatbot (iframe / composant latéral)
│   │   │   └── Loader.jsx                  # Indicateur de chargement (spinners)
│   │   │
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx           # Page principale du tableau de bord
│   │   │   ├── AlertsPage.jsx              # Page dédiée aux alertes et filtrage
│   │   │   └── ReportsPage.jsx             # Page export et rapports
│   │   │
│   │   ├── services/
│   │   │   ├── apiClient.js                # Appels aux APIs scoring/fraude via Axios
│   │   │   ├── authService.js              # Gestion JWT / OAuth2 via Keycloak
│   │   │   └── exportService.js            # Fonctions d’export PDF et Excel
│   │   │
│   │   ├── utils/
│   │   │   ├── formatters.js               # Formatage des données (pourcentage, temps, etc.)
│   │   │   └── constants.js                # Variables globales : URLs, couleurs, seuils
│   │   │
│   │   ├── styles/
│   │   │   ├── dashboard.css               # Styles globaux de l’interface
│   │   │   └── theme.js                    # Définition du thème clair/sombre
│   │   │
│   │   ├── App.jsx                         # Point d’entrée React principal
│   │   └── index.js                        # Initialisation de l’app React
│   │
│   ├── public/
│   │   ├── index.html                      # Template HTML principal
│   │   └── assets/                         # Logos, icônes, images
│   │
│   ├── package.json                        # Dépendances front (React, Chart.js, Axios, Keycloak)
│   └── Dockerfile                          # Image Docker de l’application dashboard
│
│
├── chatbot_app/                            # 🤖 Application Chatbot (User Story 5.2)
│   ├── rasa_project/
│   │   ├── data/
│   │   │   ├── nlu/
│   │   │   │   ├── nlu_fr.yml              # Intents + exemples en français
│   │   │   │   └── nlu_en.yml              # Intents + exemples en anglais
│   │   │   ├── stories.yml                 # Scénarios conversationnels (flows)
│   │   │   └── rules.yml                   # Règles de fallback et d’interruption
│   │   │
│   │   ├── actions/
│   │   │   ├── actions.py                  # Fonctions Python exécutées (appel aux APIs)
│   │   │   └── utils.py                    # Fonctions utilitaires (formatage des réponses)
│   │   │
│   │   ├── config.yml                      # Configuration pipeline NLP (spacy, transformers)
│   │   ├── domain.yml                      # Définition intents, entités, slots, réponses
│   │   ├── credentials.yml                 # Connexion API interne (FastAPI, scoring, Keycloak)
│   │   ├── endpoints.yml                   # Endpoints de déploiement (Webhook, actions serveur)
│   │   ├── Dockerfile                      # Image Docker Rasa
│   │   └── tests/
│   │       ├── test_intents_fr.yml         # Tests conversationnels FR
│   │       └── test_intents_en.yml         # Tests conversationnels EN
│   │
│   └── botpress_project/                   # (Alternative si Botpress choisi)
│       ├── flows/                          # Flows conversationnels visuels
│       ├── intents/                        # Intents + réponses
│       ├── actions/                        # Scripts JS d’exécution
│       └── bot.config.json                 # Config Botpress
│
│
├── api_gateway/                            # 🌐 API Gateway (User Story 5.3)
│   ├── main.py                             # FastAPI Gateway centralisant dashboard & chatbot
│   ├── routers/
│   │   ├── dashboard_routes.py             # Routes pour les KPIs, alertes, export
│   │   ├── chatbot_routes.py               # Proxy vers Rasa/Botpress
│   │   └── auth_routes.py                  # Authentification et refresh token
│   │
│   ├── core/
│   │   ├── config.py                       # Variables d’environnement (URLs APIs internes)
│   │   ├── security.py                     # Vérification JWT / OAuth2
│   │   └── logger.py                       # Logging centralisé
│   │
│   ├── utils/
│   │   └── websocket_manager.py            # Gestion du canal WebSocket (chatbot ↔ dashboard)
│   │
│   ├── requirements.txt                    # Dépendances FastAPI (uvicorn, pydantic, requests)
│   └── Dockerfile                          # Image Docker Gateway
│
│
├── monitoring/
│   ├── prometheus.yml                      # Scraping des métriques Dashboard + Chatbot
│   ├── grafana_dashboards/
│   │   ├── chatbot_metrics.json            # Dashboard Grafana des interactions chatbot
│   │   ├── dashboard_kpis.json             # Dashboard Grafana des KPIs (fraude, latence, AUC)
│   │   └── api_gateway_latency.json        # Suivi temps de réponse Gateway
│   └── loki_config.yml                     # Centralisation des logs applicatifs
│
│
├── docker-compose.yml                      # Orchestre Dashboard, Chatbot, Gateway, Monitoring
├── .env                                    # Variables d’environnement (API_URL, KEYCLOAK_URL, etc.)
└── README.md                               # Documentation complète module Interface Utilisateur
```

```mermaid
flowchart TD
    %% === Frontend / Dashboard ===
    subgraph Dashboard["🖥️ Dashboard (React / Streamlit)"]
        A1[Header.jsx] 
        A2[Sidebar.jsx]
        A3[KPI_Cards.jsx]
        A4[AlertsTable.jsx]
        A5[ScoreTrendsChart.jsx]
        A6[ExportButtons.jsx]
        A7[ChatbotWidget.jsx]
        A8[Loader.jsx]
        A9[DashboardPage.jsx]
        A10[ReportsPage.jsx]
    end

    %% === Chatbot ===
    subgraph Chatbot["🤖 Chatbot (Rasa / Botpress)"]
        C1[NLU / Intents FR/EN]
        C2[Stories / Flows]
        C3[Actions.py / Scripts JS]
        C4[Domain.yml]
        C5[Endpoints.yml / Webhook]
        C6[Docker Container]
    end

    %% === API Gateway ===
    subgraph APIGateway["🌐 API Gateway (FastAPI)"]
        G1[dashboard_routes.py]
        G2[chatbot_routes.py]
        G3[auth_routes.py]
        G4[websocket_manager.py]
        G5[security.py / JWT OAuth2]
        G6[logger.py]
        G7[config.py]
    end

    %% === Backend ===
    subgraph Backend["🏦 Backend Services"]
        B1[Scoring API]
        B2[Fraude API]
        B3[Auth / Keycloak]
    end

    %% === Monitoring ===
    subgraph Monitoring["📊 Monitoring & Logs"]
        M1[Prometheus Metrics]
        M2[Grafana Dashboards]
        M3[Loki Logs]
    end

    %% === Flux Frontend → Backend ===
    A1 -->|Navigation & filtres| G1
    A2 -->|Navigation & filtres| G1
    A3 -->|KPIs API call| G1
    A4 -->|Alertes API call| G1
    A5 -->|Scores API call| G1
    A6 -->|Export request| G1
    A7 -->|Chatbot message| G2
    A9 -->|Page context| G1
    A10 -->|Reports request| G1

    %% === API Gateway → Backend ===
    G1 --> B1
    G1 --> B2
    G2 --> C6
    G2 --> B1
    G2 --> B2
    G3 --> B3
    G4 --> C6

    %% === Chatbot interne ===
    C1 --> C2
    C2 --> C3
    C3 -->|Call APIs| B1
    C3 -->|Call APIs| B2
    C3 -->|Auth| B3

    %% === Monitoring connections ===
    A1 --> M1
    A2 --> M1
    A3 --> M1
    A4 --> M1
    A5 --> M1
    A7 --> M1
    G1 --> M1
    G2 --> M1
    B1 --> M1
    B2 --> M1
    B3 --> M1

    G1 --> M3
    G2 --> M3
    B1 --> M3
    B2 --> M3
    B3 --> M3

    M1 --> M2
    M3 --> M2
```
---
## 🛠️ Installation
**1️⃣ Prérequis**

- Docker & Docker Compose
- Node.js (pour dashboard React)
- Python 3.9+ (pour API Gateway)
- Helm/Kubernetes (optionnel pour déploiement en cluster)
- Clé OpenAI (pour fonctionnalités chatbot avancées)

**2️⃣ Variables d'environnement** 
Crée un fichier ``.env`` :

```env
SCORING_API_URL=http://scoring-service:8080
FRAUDE_API_URL=http://fraude-service:8080
KEYCLOAK_URL=http://keycloak:8080
OPENAI_API_KEY=your_openai_key
```

**3️⃣ Lancer l’environnement local**
```bash
docker-compose up --build
```

- Dashboard : ``http://localhost:3000``
- Chatbot : intégré dans le dashboard
- API Gateway : ``http://localhost:8000``
- Grafana : ``http://localhost:3001``
- Prometheus : ``http://localhost:9090``

---

## ⚙️ Utilisation

**1. Dashboard**
    - Visualiser KPIs, scores et alertes
    - Export PDF/Excel via boutons intégrés

**2. Chatbot**
- Cliquer sur l’icône 💬 pour ouvrir le widget
- Poser des questions sur :
    - Votre score (``demander_score``)
    - Les alertes (``demander_alerte``)
    - Les rapports (``demander_rapport``)
- Fonctionne en français et anglais

**3. Interaction Dashboard ↔ Chatbot**
- Les filtres appliqués dans le dashboard sont pris en compte par le chatbot
- Le chatbot peut déclencher l’affichage de graphiques spécifiques

---
## 🧪 Tests

- Tests conversationnels FR/EN dans ``chatbot_app/rasa_project/tests/``
- Tests d’intégration Dashboard + Chatbot via API Gateway
- Vérification logs et métriques dans Grafana

📈 Suivi et monitoring

- **Prometheus** : collecte métriques backend, dashboard et chatbot
- **Grafana** : dashboards de supervision
- **Loki** : centralisation des logs
- **WebSocket** : suivi des interactions en temps réel
