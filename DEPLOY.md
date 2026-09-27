# Deploying the website to Railway

The site is the **falisha-website** service in the Railway project **strong-inspiration**
(account: Falisha Manpower / falishamanpower4035@gmail.com). Live URL: https://falisha.up.railway.app

All code is committed to git. Deploying just uploads the current working tree and rebuilds.
You can deploy whenever the machine is free — nothing else is needed first.

---

## Option A — Deploy with a project token (recommended, no login needed)

This avoids the recurring problem where the Railway CLI switches to the wrong account
(tashfeensohail99) and returns "Unauthorized". A project token is tied to the project, not
your login, so it always works.

**One-time setup (in the Railway dashboard):**
1. Open the **strong-inspiration** project → **Settings → Tokens** (project tokens).
2. Create a token for the **production** environment. Copy it (you only see it once).
3. Save it somewhere safe (e.g. a password manager). Do NOT commit it to git.

**Then, to deploy (PowerShell):**
```powershell
$env:RAILWAY_TOKEN = "<your-project-token>"
railway up --service falisha-website --detach
```
Or just run the helper script (it will prompt for the token if not set):
```powershell
./scripts/deploy.ps1
```

## Option B — Deploy with your login

Only works while the CLI is signed in as **Falisha Manpower**:
```bash
railway whoami          # must say falishamanpower4035@gmail.com
railway login           # if it shows the wrong account: railway logout, then login
railway up --service falisha-website --detach
```

## Option C — Auto-deploy from GitHub (best long-term, set up later)

Push this repo to GitHub, then in the Railway dashboard connect the **falisha-website**
service to that repo + branch. After that every `git push` auto-deploys — no CLI, no token.
(Setup needs a one-time Railway login as Falisha Manpower.)

---

## Verify after deploying
```bash
curl -s -o /dev/null -w "%{http_code}\n" https://falisha.up.railway.app/
curl -s -o /dev/null -w "%{http_code}\n" https://falisha.up.railway.app/fill-a-vacancy
curl -s -o /dev/null -w "%{http_code}\n" https://falisha.up.railway.app/partner-with-us
```
All should return `200`. Then submit a test on /upload-cv, /fill-a-vacancy, /partner-with-us
and confirm the record appears in the Falisha Portal.

## Environment variables (set on the falisha-website service)
- `DATABASE_URL` — reference to the Postgres service (`${{Postgres.DATABASE_URL}}`)
- `PAYLOAD_SECRET`, `CRON_SECRET`, `PREVIEW_SECRET`, `PORT=3000`
- `NEXT_PUBLIC_SERVER_URL=https://falisha.up.railway.app` (update if the domain changes)
- `PORTAL_API_URL=https://glorious-flexibility-production.up.railway.app` (Falisha Portal backend;
  update here if the Portal's backend URL changes — the code also falls back to this value)

The database schema is created/updated automatically on boot from `src/migrations/*`
(Payload `prodMigrations`). After any collection/schema change, run
`pnpm payload migrate:create <name>` locally and commit before deploying.
