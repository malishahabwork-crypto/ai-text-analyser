# AI Text Analyser

A lightweight Node.js API that takes raw text input and uses Google Gemini to extract a concise topic, summary, and keywords in a reliable, structured format.

---

## What This Project Does

When you send a block of text to this service, it passes it through Google's `gemini-3.1-flash-lite` model and returns a clean, predictable JSON response containing:
- **`main_topic`**: A short phrase describing the subject.
- **`summary`**: A concise 2–3 sentence overview.
- **`keywords`**: Exactly three relevant tags.

---

## How It Works (Simple Version)

1. **Keeps Secrets Safe**: Your Gemini API key is stored securely in a local `.env` file and loaded via `dotenv`. It is never hardcoded in source files or sent back to clients, and `.env` is ignored by Git.
2. **Validates User Input**: Incoming requests must provide valid text of at least 20 characters before reaching the model.
3. **Enforces Structured Output**: The model is prompted for strict JSON. The response is parsed and passed through `validateOutput()` to ensure the required schema and fields exist.
4. **Handles Failures Gracefully**: If input is invalid, Gemini returns malformed output, or an API call fails, the app catches the error and returns clean HTTP error responses (`400` or `500`) instead of crashing the server.

---

## Technical Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- A free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Installation
1. Navigate into the project folder:
   ```bash
   cd ai-text-analyser
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the project root:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   PORT=3000
   ```

---

## How To Run It

- **Development mode (with auto-reload on file changes):**
  ```bash
  npm run dev
  ```
- **Production mode:**
  ```bash
  npm start
  ```

The server starts on `http://localhost:3000`.

---

## How To Test It and Sample Request and Response

### Health Check
Send a GET request to verify the server is running:
```bash
curl http://localhost:3000/
```
**Response:**
```json
{
  "message": "AI Text Analyser is running"
}
```

---

### Analyse Text
Send a POST request to `/analyse`:

```bash
curl -X POST http://localhost:3000/analyse \
  -H "Content-Type: application/json" \
  -d '{"text": "Artificial intelligence is transforming software engineering. Developers use AI models to accelerate workflows, write tests, and brainstorm architecture solutions efficiently."}'
```

#### Sample Successful Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "main_topic": "AI in software engineering",
    "summary": "Artificial intelligence is changing how software is built. Developers leverage AI models to speed up tasks, write tests, and design architectures. This leads to more efficient engineering workflows.",
    "keywords": [
      "Artificial Intelligence",
      "Software Development",
      "Productivity"
    ]
  }
}
```

#### Sample Invalid Input Response (`400 Bad Request`)
If text is missing or under 20 characters (`{"text": "Too short"}`):
```json
{
  "error": "Text is too short to analyse"
}
```

