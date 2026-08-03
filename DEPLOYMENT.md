# Deployment Guide

This app is two services deployed separately:

1. **Frontend** — static Next.js export → GitHub Pages
2. **Backend** — Django API → any Docker/WSGI host (Render, Railway, Fly, etc.)

They must both be deployed and pointed at each other for the app to actually work end-to-end — deploying only the frontend gives you a site where signup/signin/check-ins all fail.

## 1. Deploy the backend first

You need its URL before the frontend build can be configured.

1. Provision a Postgres database (or use the host's managed Postgres).
2. Deploy `backend/` using `backend/Dockerfile` (`gunicorn core.wsgi:application --bind 0.0.0.0:8000`) to your host of choice.
3. Set these environment variables on the host (see `backend/.env.example`):
   - `SECRET_KEY` — required when `DEBUG=False`, the app refuses to start without one
   - `DEBUG=False`
   - `ALLOWED_HOSTS` — your backend's domain
   - `DATABASE_URL` — your Postgres connection string
   - `CORS_ALLOWED_ORIGINS` — must include your GitHub Pages URL, e.g. `https://<github-username>.github.io`
4. Run migrations on the host: `python manage.py migrate`
5. Confirm it's up: `GET https://<your-backend>/api/schema/` should return 200.

## 2. Configure and deploy the frontend

1. In the GitHub repo: **Settings → Secrets and variables → Actions → Variables**, add:
   - `NEXT_PUBLIC_API_URL` = your backend's URL from step 1 (e.g. `https://pridally-api.onrender.com`)

   This is required — it's baked into the static build at build time. Without it, the deployed site falls back to `http://127.0.0.1:8000`, which doesn't exist in production.

2. **Enable GitHub Pages:** repo **Settings → Pages → Source: GitHub Actions**.

3. Push to `main`:
   ```bash
   git push origin main
   ```

4. Watch the **Actions** tab for the "Deploy Next.js to GitHub Pages" workflow. On success, the site is live at:
   `https://<github-username>.github.io/<repo-name>/`

   `next.config.js` derives the GitHub Pages base path (`/<repo-name>/`) automatically from `GITHUB_ACTIONS=true`, which the Actions runner sets for you — no manual base-path config needed for that part.

## Manual builds

```bash
# Frontend
npm run build   # -> ./out (static export)

# Backend
cd backend && docker build -t pridally-backend . && docker run -p 8000:8000 --env-file .env pridally-backend
```

## Troubleshooting

- **Auth/check-ins fail silently in production**: `NEXT_PUBLIC_API_URL` wasn't set (or was wrong) at build time — it's compiled into the static bundle, so you must rebuild after changing it, not just redeploy.
- **CORS errors in the browser console**: the backend's `CORS_ALLOWED_ORIGINS` doesn't include your actual GitHub Pages origin.
- **404 on deploy**: repo name mismatch — `next.config.js`'s `repoName` constant must match the actual GitHub repo name.
- **Backend won't start**: check `DEBUG`/`SECRET_KEY`/`DATABASE_URL` are all set correctly on the host.
