# Hope Mesh Frontend (React + Vite)

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Copy environment file and adjust values if needed:

```bash
cp .env.example .env
```

3. Start frontend:

```bash
npm run dev
```

## Backend connectivity

- Frontend API calls use `VITE_API_BASE_URL`.
- Default value is `/api` and Vite proxies it to `VITE_DEV_BACKEND_URL`.
- Default proxy target is `http://127.0.0.1:8000`.

Examples:

- Local development:
	- `VITE_API_BASE_URL=/api`
	- `VITE_DEV_BACKEND_URL=http://127.0.0.1:8000`
- Direct production API URL:
	- `VITE_API_BASE_URL=https://api.example.com`

## Auth endpoints wired in UI

- `POST /auth/login`
- `POST /auth/signup/ngo`
- `POST /auth/signup/volunteer`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET /auth/reset-password/validate`
