# Calming Echo - An Active Listening AI Chatbot

A full-stack web application that uses Google's Gemini API to create an active listening experience. The app simulates a thoughtful conversational partner that summarizes what you've shared and asks meaningful follow-up questions.


## Project Structure

```
project-root/
├── client/                       # Frontend React application
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── ChatInput.jsx     # Text input with auto-resize textarea
│   │   │   ├── chatInput.css
│   │   │   ├── MessageList.jsx   # Message bubbles, scroll, loading dots
│   │   │   ├── messageList.css
│   │   │   ├── Navbar.jsx        # Fixed nav with scroll detection
│   │   │   ├── navbar.css
│   │   │   ├── ThemeToggle.jsx   # Dark/light mode toggle
│   │   │   ├── themeToggle.css
│   │   │   └── ErrorBoundary.jsx # Catch render errors, show fallback
│   │   ├── hooks/                # Custom React hooks
│   │   │   └── useChat.js        # Chat state, streaming, word reveal
│   │   ├── routes/               # Page components
│   │   │   ├── chatPage/         # Chat interface
│   │   │   │   ├── ChatPage.jsx  # Orchestrates hook + components
│   │   │   │   └── chatPage.css
│   │   │   └── homepage/         # Landing page
│   │   │       ├── Homepage.jsx
│   │   │       └── homepage.css
│   │   ├── App.jsx               # Routing and app shell
│   │   ├── app.css
│   │   ├── index.css             # Global reset and base styles
│   │   ├── tokens.css            # Design tokens (colors, spacing, type)
│   │   └── main.jsx              # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                       # Backend Express server
│   ├── config/                   # Configuration
│   │   ├── index.js              # Centralized env variables and settings
│   │   └── gemini.js             # Gemini SDK client initialization
│   ├── middleware/
│   │   └── index.js              # CORS, JSON parsing, logging
│   ├── prompts/
│   │   └── activeListenerPrompt.js  # System instruction and history formatting
│   ├── routes/
│   │   └── activeListener.js     # Chat endpoint with streaming
│   ├── server.js                 # App bootstrap and route mounting
│   ├── .env                      # Environment variables (not in repo)
│   ├── .env.example              # Example environment template
│   └── package.json
└── package.json                  # Root scripts for running both services
```

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/calming-echo-app.git
cd calming-echo-app
```

2. Install dependencies:
```bash
npm run install:all
```

3. Configure your environment:
```bash
cp server/.env.example server/.env
```
Edit `server/.env` and add your Gemini API key.

4. Start the development servers:
```bash
npm run dev
```

The client will be available at http://localhost:5173 and the server at http://localhost:3001.

## Available Scripts
* `npm run dev` - Start both client and server in development mode
* `npm run client` - Start only the client
* `npm run server` - Start only the server
