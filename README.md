# Pridally Daily Guide

A comprehensive daily health guide for LGBTQIA+ wellness, built with Next.js/React on the frontend and a Django REST API backend.

## 🏗️ Architecture

This is a two-service application:

- **Frontend** (`app/`, `src/`): Next.js 15 (App Router), statically exported (`output: 'export'`) and deployed to **GitHub Pages**. Since a static export has no server runtime, it talks to the backend directly over the network using JWT auth.
- **Backend** (`backend/`): Django REST Framework API with JWT auth (`djangorestframework-simplejwt`), deployed separately (e.g. Render/Railway/Fly — anywhere that can run a WSGI app + Postgres). See `backend/README.md` for API docs and `backend/Dockerfile` for containerized deploys.

Because the frontend is a static export, `NEXT_PUBLIC_API_URL` must be set **at build time** to the backend's real URL. Locally it defaults to `http://127.0.0.1:8000`.

## 🚀 Features

- Real JWT-authenticated signup/signin (Django backend, not mocked)
- Daily health check-ins across five categories (mental, sexual, reproductive, physical, social health), persisted server-side
- Health calendar tracking, doctor scheduling, health chatbot
- Responsive design with Tailwind CSS + ShadCN/UI

## 📦 Local Development

You need both services running locally.

### Backend (Django API)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env  # defaults are fine for local dev (SQLite, insecure dev SECRET_KEY)

python manage.py migrate
python manage.py runserver 8000
```

The API is now at `http://127.0.0.1:8000/api/`, with interactive docs at `http://127.0.0.1:8000/api/docs/`. No Postgres install needed locally — it falls back to a SQLite file (`backend/db.sqlite3`) when `DATABASE_URL` isn't set. See `backend/README.md` for full endpoint documentation.

### Frontend (Next.js)

```bash
cp .env.example .env.local  # NEXT_PUBLIC_API_URL defaults to http://127.0.0.1:8000
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, ShadCN/UI + Radix UI, React Query
- **Backend:** Django 4.2, Django REST Framework, SimpleJWT, PostgreSQL (SQLite for local dev)

## 🏗️ Build & Deploy

```bash
npm run build   # produces a static export in ./out
```

### Frontend → GitHub Pages

Deploys automatically via `.github/workflows/deploy.yml` on push to `main`. Requires a repo variable `NEXT_PUBLIC_API_URL` (Settings → Secrets and variables → Actions → Variables) pointing at your deployed backend, and `CORS_ALLOWED_ORIGINS` on the backend to include your GitHub Pages origin.

### Backend → wherever runs Docker

```bash
cd backend
docker build -t pridally-backend .
docker run -p 8000:8000 --env-file .env pridally-backend
```

Set `DEBUG=False`, a real `SECRET_KEY`, and `DATABASE_URL` (Postgres) in production — see `backend/.env.example`.

## 📁 Project Structure

```
├── app/                    # Next.js App Router (routes only — thin wrappers)
│   ├── layout.tsx
│   ├── page.tsx            # Landing page, redirects to /dashboard if authenticated
│   ├── dashboard/           # Authenticated app (guarded route)
│   └── ...                 # auth, pridally, gender_identity, marketing pages
├── src/
│   ├── components/
│   │   ├── auth/           # Auth forms
│   │   ├── dashboard/      # Authenticated app UI
│   │   ├── landing/        # Landing page
│   │   ├── pridally/       # Marketing pages + shared SiteHeader/SiteFooter
│   │   └── ui/             # ShadCN UI primitives
│   ├── contexts/           # AuthContext, HealthContext (call the Django API)
│   ├── lib/api.ts          # API client (JWT handling, typed endpoints)
│   └── hooks/
├── backend/                 # Django REST API (see backend/README.md)
├── public/                  # Static assets
└── .github/workflows/       # GitHub Actions (frontend deploy)
```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the static export (`./out`)
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Styling

This project uses Tailwind CSS with a custom healthcare-focused design system featuring calming blues and greens. The color scheme is defined in `app/globals.css`.

## 📝 License

This project is private and not licensed for public use.
