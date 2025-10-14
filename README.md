# Interface Utilisateur — Dashboard + Chatbot

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
