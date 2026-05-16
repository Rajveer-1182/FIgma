# Project PlanetX - Task Management Dashboard

A full-stack project management application built with Next.js and Express.js.

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (recommended) or PostgreSQL
- **State Management**: React Context + Hooks
- **UI Components**: Custom components + Tailwind CSS

## Project Structure

```
project-planetx/
├── frontend/                 # Next.js frontend application
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   ├── styles/
│   └── package.json
├── backend/                  # Express.js backend API
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   └── package.json
├── shared/                   # Shared types and utilities
│   └── types.ts
└── docker-compose.yml       # Docker setup (optional)
```

## Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## Environment Variables

See `.env.example` files in each directory.
