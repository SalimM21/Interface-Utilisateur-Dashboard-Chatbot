<#
Test E2E via API Gateway
Envoie un message au endpoint FastAPI /chatbot/message (port 8001) qui proxy vers Rasa.
#>
$gatewayUrl = 'http://localhost:8001/chatbot/message'
$payload = @{ sender = 'e2e_user'; message = 'Bonjour, pouvez-vous me donner mon score ?' } | ConvertTo-Json

Write-Host "Envoi d'une requête POST à $gatewayUrl ..."
try {
    $resp = Invoke-RestMethod -Uri $gatewayUrl -Method Post -Body $payload -ContentType 'application/json' -TimeoutSec 10
    Write-Host "Réponse reçue via API Gateway:" -ForegroundColor Green
    $resp | ConvertTo-Json -Depth 5
} catch {
    Write-Host "Erreur lors du test e2e via gateway: $_" -ForegroundColor Red
    exit 1
}

Write-Host "Test E2E terminé" -ForegroundColor Cyan
