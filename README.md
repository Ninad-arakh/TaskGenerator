# AI Task Generator – Mini Planning Tool

## Live App
<your-live-link>

## Overview
This app allows users to:
- Describe a feature idea (goal, users, constraints)
- Generate user stories and engineering tasks using an LLM
- Edit, reorder, and group tasks
- Export tasks as text or markdown
- View the last 5 generated specs

## Tech Stack
Frontend: React + Vite  
Backend: Node.js + Express  
Database: (SQLite / Postgres / in-memory)  
LLM: (OpenAI GPT-4 / GPT-4o / etc.)

## Features Implemented
- Feature spec form
- Task generation
- Edit/delete
- Reordering
- Grouping
- Export (copy/download)
- Last 5 specs history
- Status page (backend + db + llm health check)
- Basic validation

## Not Implemented (Time Trade-offs)
- Authentication
- Multi-user storage
- Full test suite
- Advanced prompt customization

## Run Locally

### Backend
cd backend  
npm install  
npm run dev  

### Frontend
cd frontend  
npm install  
npm run dev  

Make sure `.env` is configured (see `.env.example`).
