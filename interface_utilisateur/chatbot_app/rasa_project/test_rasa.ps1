# Test script pour vérifier Rasa et action server
Write-Host "== Vérification /status de Rasa =="
try {
    $status = Invoke-RestMethod -Uri 'http://localhost:5005/status' -Method Get -TimeoutSec 10
    Write-Host "Rasa /status:" -ForegroundColor Green
    $status | ConvertTo-Json -Depth 5
} catch {
    Write-Host "Erreur lors de l'appel /status : $_" -ForegroundColor Red
    exit 2
}

Write-Host "`n== Vérification action server (5055) =="
try {
    $as = Invoke-RestMethod -Uri 'http://localhost:5055' -Method Get -TimeoutSec 5
    Write-Host "Action server reachable (http://localhost:5055)" -ForegroundColor Green
} catch {
    Write-Host "Action server non joignable: $_" -ForegroundColor Yellow
}

Write-Host "`n== Envoi d'un message test au webhook REST de Rasa =="
$body = @{ sender = 'test_user'; message = 'Bonjour, je veux mon score' } | ConvertTo-Json
try {
    $resp = Invoke-RestMethod -Uri 'http://localhost:5005/webhooks/rest/webhook' -Method Post -Body $body -ContentType 'application/json' -TimeoutSec 10
    Write-Host "Réponse du webhook REST:" -ForegroundColor Green
    if ($null -eq $resp) { Write-Host "Aucune réponse (body vide)" -ForegroundColor Yellow }
    else { $resp | ConvertTo-Json -Depth 5 }
} catch {
    Write-Host "Erreur lors de l'envoi du message de test: $_" -ForegroundColor Red
    exit 3
}

Write-Host "`n== Test terminé ==" -ForegroundColor Cyan

