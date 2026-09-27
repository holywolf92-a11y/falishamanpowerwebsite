# Deploy the website (falisha-website) to Railway.
# Usage:  ./scripts/deploy.ps1
# Uses a Railway project token if RAILWAY_TOKEN is set (recommended — avoids the CLI
# account-switching problem). Otherwise falls back to your current railway login.
# See DEPLOY.md for how to create a project token.

$ErrorActionPreference = "Stop"
$service = "falisha-website"

Write-Host "Deploying '$service' to Railway..." -ForegroundColor Cyan

if (-not $env:RAILWAY_TOKEN) {
  $token = Read-Host "Enter Railway project token (or press Enter to use your login)"
  if ($token) { $env:RAILWAY_TOKEN = $token }
}

if ($env:RAILWAY_TOKEN) {
  Write-Host "Using project token." -ForegroundColor Green
} else {
  Write-Host "No token set - using CLI login. Checking account..." -ForegroundColor Yellow
  railway whoami
  Write-Host "If that is NOT falishamanpower4035@gmail.com, run 'railway logout' then 'railway login' and re-run this script." -ForegroundColor Yellow
}

railway up --service $service --detach

Write-Host ""
Write-Host "Deploy started. It builds in the background (~2-3 min)." -ForegroundColor Cyan
Write-Host "Check status: railway status   |   Site: https://falisha.up.railway.app" -ForegroundColor Cyan
