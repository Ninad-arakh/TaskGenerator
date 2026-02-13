# AI Task Generator – Mini Planning Tool

## Live App
<https://ai-task-generator-theta.vercel.app/>

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
Database: MongoDb   
LLM: Gemini 2.5 flash

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

# How to Run Locally

### Backend
```
cd backend  
npm install  
npm run dev  
```

### Frontend
```
cd frontend  
npm install  
npm run dev  
```
--- 
now the project is running on 
```
http://localhost:5173
```

Make sure `.env` is configured (see `.env.example`).


<!-- ## project structure
```
ai-task-generator/
│
├── backend/
├── frontend/
├── README.md
├── AI_NOTES.md
├── PROMPTS_USED.md
├── ABOUTME.md
├── .env.example
``` -->