# -------------------
# Routes FastAPI pour le dashboard : KPIs, alertes, export PDF/Excel

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import datetime

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

# -----------------------------
# Modèles
class KPIResponse(BaseModel):
    fraud_rate: float
    auc_score: float
    avg_latency: float

class AlertResponse(BaseModel):
    alerts: List[str]

class ExportRequest(BaseModel):
    format: str = "pdf"  # pdf ou excel
    date_range: Optional[str] = None

class ExportResponse(BaseModel):
    file_link: str

# -----------------------------
# Routes KPIs
@router.get("/kpis", response_model=KPIResponse)
def get_kpis():
    try:
        # Simulé pour l'exemple
        fraud_rate = 0.042  # 4.2%
        auc_score = 0.89
        avg_latency = 1.23  # secondes
        return KPIResponse(fraud_rate=fraud_rate, auc_score=auc_score, avg_latency=avg_latency)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# -----------------------------
# Routes Alertes
@router.get("/alerts", response_model=AlertResponse)
def get_alerts():
    try:
        alerts = [
            "Transaction suspecte n°123",
            "Connexion inhabituelle depuis un nouvel appareil"
        ]
        return AlertResponse(alerts=alerts)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# -----------------------------
# Route Export PDF/Excel
@router.post("/export", response_model=ExportResponse)
def export_dashboard(request: ExportRequest):
    try:
        # Simulé : générer un lien fictif
        now = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        file_link = f"http://localhost:8000/exports/dashboard_{now}.{request.format}"
        return ExportResponse(file_link=file_link)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
