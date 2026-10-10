# ============================================================================
#  Falisha Manpower — load migrated content into the PRODUCTION database.
#
#  Loads 28 countries, 18 industries and 170 blog posts into the live Railway
#  Postgres, by running a LOCAL Next server pointed at the production database
#  and calling the import routes (which need no auth in local/dev mode).
#
#  It does NOT depend on the Railway app deploy — the live site reads the DB at
#  runtime, so the content appears as soon as this finishes.
#
#  Run from the repo root (D:\falishawebsite):
#     powershell -ExecutionPolicy Bypass -File scripts/load-prod-data.ps1
#
#  Requirements: the `railway` CLI logged in as falishamanpower4035, and this
#  repo (which contains src/data/wp-posts.json) — both already on this machine.
# ============================================================================
$ErrorActionPreference = 'Stop'
$repo = (Get-Location).Path

Write-Host "`n[1/7] Railway account:" -ForegroundColor Cyan
railway whoami

Write-Host "`n[2/7] Reading the production database connection..." -ForegroundColor Cyan
try { railway tcp-proxy create --port 5432 --service Postgres 2>$null | Out-Null } catch {}
$kvRaw = railway variables --service Postgres --kv
$kv = @{}
foreach ($line in ($kvRaw -split "`r?`n")) {
  if ($line -match '^\s*([^=]+)=(.*)$') { $kv[$matches[1].Trim()] = $matches[2] }
}
$dbUrl = $kv['DATABASE_PUBLIC_URL']
if (-not $dbUrl) {
  $h = $kv['RAILWAY_TCP_PROXY_DOMAIN']; $p = $kv['RAILWAY_TCP_PROXY_PORT']
  $u = $kv['PGUSER']; if (-not $u) { $u = 'postgres' }
  $pw = $kv['PGPASSWORD']; $db = $kv['POSTGRES_DB']; if (-not $db) { $db = $kv['PGDATABASE'] }
  if (-not $h -or -not $pw -or -not $db) { throw "Could not read the DB connection (enable Postgres > Settings > Public Networking in the Railway dashboard, then re-run)." }
  $dbUrl = "postgresql://${u}:${pw}@${h}:${p}/${db}"
}
$safe = $dbUrl -replace ':[^:@/]+@', ':****@'
Write-Host "      Using: $safe" -ForegroundColor DarkGray

Write-Host "`n[3/7] Starting a local server pointed at PRODUCTION (port 3900)..." -ForegroundColor Cyan
# Run `pnpm dev` inside a background job so PowerShell resolves the pnpm shim correctly.
$job = Start-Job -ScriptBlock {
  param($dir, $url)
  Set-Location $dir
  $env:DATABASE_URL = $url
  $env:PAYLOAD_MIGRATING = 'true'   # use the existing prod schema; do not push
  $env:PORT = '3900'
  $env:NODE_ENV = 'development'
  pnpm dev *>&1
} -ArgumentList $repo, $dbUrl

try {
  Write-Host "`n[4/7] Waiting for it to be ready (up to ~2 min)..." -ForegroundColor Cyan
  $ready = $false
  for ($i = 0; $i -lt 60; $i++) {
    try { $r = Invoke-WebRequest 'http://localhost:3900/' -TimeoutSec 5 -UseBasicParsing; if ($r.StatusCode -ge 200) { $ready = $true; break } } catch {}
    Start-Sleep -Seconds 3
  }
  if (-not $ready) {
    Write-Host "Server did not become ready. Last output from the dev server:" -ForegroundColor Red
    Receive-Job $job | Select-Object -Last 40
    throw "Local server did not start on port 3900."
  }

  Write-Host "`n[5/7] Countries + industries..." -ForegroundColor Cyan
  $cc = 0
  try { $cc = (Invoke-WebRequest 'http://localhost:3900/api/countries?limit=0&depth=0' -TimeoutSec 30 -UseBasicParsing | ConvertFrom-Json).totalDocs } catch {}
  if ($cc -ge 28) {
    Write-Host "   already loaded ($cc countries) - skipping seed (avoids a destructive re-clear)." -ForegroundColor DarkGray
  } else {
    try { (Invoke-WebRequest 'http://localhost:3900/next/seed-recruitment' -TimeoutSec 300 -UseBasicParsing).Content }
    catch { Write-Host ("   seed call reported: " + $_.Exception.Message + " (continuing)") -ForegroundColor Yellow }
  }

  Write-Host "`n[6/7] Importing blog posts (idempotent - skips any already imported; ~1-2 min)..." -ForegroundColor Cyan
  try { (Invoke-WebRequest 'http://localhost:3900/next/import-posts' -TimeoutSec 900 -UseBasicParsing).Content }
  catch { Write-Host ("   import call reported: " + $_.Exception.Message + " (safe to re-run; it continues where it left off)") -ForegroundColor Yellow }

  Write-Host "`n   Final counts on production:" -ForegroundColor Cyan
  foreach ($col in 'countries','industries','posts') {
    try { $n = (Invoke-WebRequest "http://localhost:3900/api/$col`?limit=0&depth=0" -TimeoutSec 30 -UseBasicParsing | ConvertFrom-Json).totalDocs } catch { $n = '?' }
    Write-Host ("     {0,-11} {1}" -f $col, $n) -ForegroundColor Green
  }
}
finally {
  Write-Host "`n[7/7] Stopping the local server..." -ForegroundColor Cyan
  if ($job) { Stop-Job $job -ErrorAction SilentlyContinue; Remove-Job $job -Force -ErrorAction SilentlyContinue }
  Get-NetTCPConnection -LocalPort 3900 -ErrorAction SilentlyContinue | ForEach-Object {
    try { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue } catch {}
  }
}

Write-Host "`nDone. Verify the live site:" -ForegroundColor Green
Write-Host "   https://falisha.up.railway.app/countries   (expect 28)" -ForegroundColor Green
Write-Host "   https://falisha.up.railway.app/industries  (expect 18)" -ForegroundColor Green
Write-Host "   https://falisha.up.railway.app/posts       (expect 170)" -ForegroundColor Green
