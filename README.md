# ArchiText Server

The backend service for ArchiText, an AI-powered software architecture visualization tool. It leverages the Groq SDK and the Llama3-70b model to generate comprehensive, production-ready architecture designs.

## Tech Stack

- **Runtime**: Node.js (v20+)
- **Framework**: Express.js
- **AI Integration**: Groq SDK (`llama3-70b-8192`)
- **Environment Management**: Dotenv
- **CORS**: Enabled for frontend integration

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- A Groq API Key (get one at [console.groq.com](https://console.groq.com/)).

### Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the `server` root:
   ```bash
   cp .env.example .env
   ```

2. Add your Groq API Key to the `.env` file:
   ```env
   PORT=5000
   GROQ_API_KEY=your_groq_api_key_here
   ```

### Running the Server

- **Development Mode** (with nodemon):
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  node main.js
  ```

The server will start at `http://localhost:5000`.

## API Endpoints

### `POST /ai-chat`
Generates a software architecture based on a user prompt.

**Request Body:**
```json
{
  "prompt": "Build a scalable habit tracker app"
}
```

**Response:**
Returns a structured JSON object containing `projectTitle`, `techStack`, `schema`, `apis`, `structure`, and `scaling` strategies.

## Project Structure

- `main.js`: Entry point and server configuration.
- `routes/`: Express route definitions.
- `services/`: AI service integration (Groq).
- `prompts/`: System prompts for the AI architect.
