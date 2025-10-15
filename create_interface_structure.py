import os

# --- Structure du projet Interface Utilisateur ---
structure = {
    "interface_utilisateur": {
        "dashboard_app": {
            "src": {
                "components": {
                    "Header.jsx": "",
                    "Sidebar.jsx": "",
                    "KPI_Cards.jsx": "",
                    "AlertsTable.jsx": "",
                    "ScoreTrendsChart.jsx": "",
                    "ExportButtons.jsx": "",
                    "ChatbotWidget.jsx": "",
                    "Loader.jsx": ""
                },
                "pages": {
                    "DashboardPage.jsx": "",
                    "AlertsPage.jsx": "",
                    "ReportsPage.jsx": ""
                },
                "services": {
                    "apiClient.js": "",
                    "authService.js": "",
                    "exportService.js": ""
                },
                "utils": {
                    "formatters.js": "",
                    "constants.js": ""
                },
                "styles": {
                    "dashboard.css": "",
                    "theme.js": ""
                },
                "App.jsx": "",
                "index.js": ""
            },
            "public": {
                "index.html": "",
                "assets": {}
            },
            "package.json": "",
            "Dockerfile": ""
        },
        "chatbot_app": {
            "rasa_project": {
                "data": {
                    "nlu": {
                        "nlu_fr.yml": "",
                        "nlu_en.yml": ""
                    },
                    "stories.yml": "",
                    "rules.yml": ""
                },
                "actions": {
                    "actions.py": "",
                    "utils.py": ""
                },
                "config.yml": "",
                "domain.yml": "",
                "credentials.yml": "",
                "endpoints.yml": "",
                "Dockerfile": "",
                "tests": {
                    "test_intents_fr.yml": "",
                    "test_intents_en.yml": ""
                }
            },
            "botpress_project": {
                "flows": {},
                "intents": {},
                "actions": {},
                "bot.config.json": ""
            }
        },
        "api_gateway": {
            "main.py": "",
            "routers": {
                "dashboard_routes.py": "",
                "chatbot_routes.py": "",
                "auth_routes.py": ""
            },
            "core": {
                "config.py": "",
                "security.py": "",
                "logger.py": ""
            },
            "utils": {
                "websocket_manager.py": ""
            },
            "requirements.txt": "",
            "Dockerfile": ""
        },
        "monitoring": {
            "prometheus.yml": "",
            "grafana_dashboards": {
                "chatbot_metrics.json": "",
                "dashboard_kpis.json": "",
                "api_gateway_latency.json": ""
            },
            "loki_config.yml": ""
        },
        "docker-compose.yml": "",
        ".env": "",
        "README.md": ""
    }
}


# --- Fonction récursive pour création de structure ---
def create_structure(base_path, structure_dict):
    for name, content in structure_dict.items():
        path = os.path.join(base_path, name)
        if isinstance(content, dict):
            os.makedirs(path, exist_ok=True)
            create_structure(path, content)
        else:
            os.makedirs(os.path.dirname(path), exist_ok=True)
            open(path, 'a').close()


# --- Exécution principale ---
if __name__ == "__main__":
    base_dir = os.getcwd()
    create_structure(base_dir, structure)
    print("✅ Arborescence du projet 'interface_utilisateur' créée avec succès !")
