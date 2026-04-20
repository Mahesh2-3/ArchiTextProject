# 🚀 StructAI --- Project Metadata

## 🧾 1. Project Name

**StructAI**

## 🏷️ 2. Tagline

**Turn ideas into production-ready system architecture --- not code.**

## 🎯 3. Problem Statement

Developers (students & early engineers) struggle with: - Starting
projects properly - Designing database schemas - Structuring backend
APIs - Choosing the right tech stack - Thinking about scalability &
security

Existing tools focus on code generation and fail to teach system design
thinking.

## 💡 4. Solution

An AI-powered System Architect that converts plain English ideas into: -
Structured architecture plans - Scalable system designs -
Developer-friendly blueprints

## 🎯 6. Core Features

### MVP:

- Idea → Tech Stack
- Idea → Database Schema
- Idea → API Routes

### Advanced:

- Folder Structure Generation
- Data Flow Visualization
- Scaling Suggestions
- Security Best Practices

### Differentiators:

- "Why This?" explanations
- Editable architecture
- Beginner → Advanced modes
- Architecture comparison

## 🧠 7. Workflow

User Input → AI Parsing → Architecture Engine → Output Formatter → UI
Display

## 🧩 8. System Architecture

Frontend: Next.js + Tailwind CSS\
Backend: Next.js API Routes\
AI Layer: Prompt Engine + JSON Parser\
Database: MongoDB

## 🧠 10. AI Design

Prompt asks AI to act as a senior system architect and return structured
JSON: - Tech Stack - Schema - APIs - Structure - Scaling

AI should return this ↓

1. Tech Stack (with reasons)
2. Database Schema
3. API Routes
4. Folder Structure
5. Scaling Suggestions

```
{
  "techStack": {
    "frontend": {
      "name": "Next.js",
      "reason": "Supports SSR, API routes, and fast UI development"
    },
    "backend": {
      "name": "Next.js API Routes",
      "reason": "Simplifies architecture by combining frontend and backend"
    },
    "database": {
      "name": "MongoDB",
      "reason": "Flexible schema for storing user habits and logs"
    },
    "authentication": {
      "name": "NextAuth.js",
      "reason": "Easy integration with multiple providers and session handling"
    },
    "stateManagement": {
      "name": "Zustand",
      "reason": "Lightweight and simple state management"
    },
    "styling": {
      "name": "Tailwind CSS",
      "reason": "Fast UI development with utility-first styling"
    }
  },

  "schema": [
    {
      "collection": "User",
      "fields": [
        { "name": "id", "type": "ObjectId", "description": "Unique user identifier" },
        { "name": "email", "type": "string", "description": "User email" },
        { "name": "password", "type": "string", "description": "Hashed password" },
        { "name": "createdAt", "type": "Date", "description": "Account creation time" }
      ]
    },
    {
      "collection": "Habit",
      "fields": [
        { "name": "id", "type": "ObjectId", "description": "Unique habit ID" },
        { "name": "userId", "type": "ObjectId", "description": "Reference to User" },
        { "name": "title", "type": "string", "description": "Habit name" },
        { "name": "frequency", "type": "string", "description": "daily/weekly/monthly" },
        { "name": "createdAt", "type": "Date", "description": "Creation date" }
      ]
    },
    {
      "collection": "HabitLog",
      "fields": [
        { "name": "id", "type": "ObjectId", "description": "Log ID" },
        { "name": "habitId", "type": "ObjectId", "description": "Reference to Habit" },
        { "name": "date", "type": "Date", "description": "Date of completion" },
        { "name": "status", "type": "boolean", "description": "Completed or not" }
      ]
    }
  ],

  "apis": [
    {
      "method": "POST",
      "route": "/api/auth/register",
      "description": "Register new user"
    },
    {
      "method": "POST",
      "route": "/api/auth/login",
      "description": "Authenticate user"
    },
    {
      "method": "GET",
      "route": "/api/habits",
      "description": "Get all habits for a user"
    },
    {
      "method": "POST",
      "route": "/api/habits",
      "description": "Create a new habit"
    },
    {
      "method": "PUT",
      "route": "/api/habits/:id",
      "description": "Update habit details"
    },
    {
      "method": "DELETE",
      "route": "/api/habits/:id",
      "description": "Delete a habit"
    },
    {
      "method": "POST",
      "route": "/api/habits/:id/log",
      "description": "Mark habit as completed for a day"
    },
    {
      "method": "GET",
      "route": "/api/habits/:id/logs",
      "description": "Get habit tracking history"
    }
  ],

  "structure": {
    "frontend": [
      "/app",
      "/components",
      "/features/habits",
      "/features/auth",
      "/hooks",
      "/utils"
    ],
    "backend": [
      "/app/api/auth",
      "/app/api/habits",
      "/lib/db",
      "/lib/auth",
      "/services"
    ]
  },

  "scaling": [
    "Implement caching using Redis for frequently accessed habit data",
    "Use pagination for fetching habit logs to reduce load",
    "Add rate limiting to prevent abuse of API endpoints",
    "Separate authentication and habit services into microservices if scaling increases",
    "Use CDN for static assets to improve frontend performance"
  ]
}
```

## 🎨 11. UI/UX

- Clean (Notion-like)
- Section-based output
- Copy buttons
- Expand/collapse

## ⚡ 12. Performance

- Caching
- Debouncing
- Lazy loading

## 🔐 13. Security

- Rate limiting
- Input sanitization
- API key protection

## 14. third Party modules

- React flow (mind mapping)
- firebase

## 15. DataBase structure

- User Collection
- Projects Collection
- Conversation Collection
- Messages Collection

## 16. Models

### I. User

- \_id
- name
- email
- password
- createdAt

### II. Project

- \_id
- userId // reference to User
- title
- description
- metaData // AI initial JSON (IMPORTANT)
- metaDataVersion
- createdAt

### III. Conversation

- \_id
- projectId // reference to Project
- title
- createdAt

### IV. Message

- \_id
- conversationId // reference
- role // "user" | "ai"
- content // text OR JSON
- createdAt

## 🏁 17. Future Scope

- Export to PDF / Notion
- Team collaboration
- Plugin system
- GitHub integration

## 18. What to use ?

- Auth → Custom Auth
- Database → MongoDB Atlas
- Frontend → NextJs
- Backend → NextJs
