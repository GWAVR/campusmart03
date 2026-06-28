<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# CampusMart

A campus marketplace application with a React frontend and Express backend.

View your app in AI Studio: https://ai.studio/apps/1e0490e9-c1b5-4ada-8453-d9a7b0e67090

## Project Structure

```
campusmart/
├── frontend/          # React + Vite frontend (port 3000)
│   ├── src/           # React components, styles, utilities
│   ├── index.html     # HTML entry point
│   ├── vite.config.ts # Vite configuration (proxies API to backend)
│   └── package.json   # Frontend dependencies
│
├── backend/           # Express API server (port 5000)
│   ├── index.js       # Server entry point
│   ├── config/        # Firebase configuration
│   ├── routes/        # API route handlers
│   ├── middleware/     # Error handling middleware
│   ├── data/          # Seed scripts
│   └── package.json   # Backend dependencies
│
├── firestore.rules    # Firestore security rules
└── firebase-*.json    # Firebase configuration files
```

## Run Locally

**Prerequisites:** Node.js

### Option 1: Run Both Together (from root)

```bash
npm install
npm run dev:all
```

### Option 2: Run Separately

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Seed Database

```bash
cd backend
npm run seed
```

## Environment Variables

- Copy `frontend/.env.example` to `frontend/.env.local` and set your `GEMINI_API_KEY`
- Copy `backend/.env.example` to `backend/.env` for backend configuration
