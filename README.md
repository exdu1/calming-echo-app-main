# Calming Eacho - An Active Listening AI Chatbot

A full-stack web application that uses Google's Gemini API to create an active listening experience. The app simulates a thoughtful conversational partner that summarizes what you've shared and asks meaningful follow-up questions.


## Project Structure

```
project-root/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── routes/       # Page components
│   │   │   ├── chatPage/ # Chat interface
│   │   │   └── homepage/ # Landing page
│   │   ├── App.jsx       # Main component with routing
│   │   └── main.jsx      # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/               # Backend Express server
│   ├── server.js         # API routes and server setup
│   ├── .env              # Environment variables (not in repo)
│   ├── .env.example      # Example environment template
│   └── package.json
└── package.json          # Root package.json for running both services
```

## Getting Started

### Installation

`1. Clone the repository:`
```bash
git clone https://github.com/your-username/calming-echo-app.git
cd calming-echo-app
```

`2. Install dependencies:`
```bash
npm run install: all
cd client
npm install --legacy-peer-deps
```

`3. Configure your environment:`
```bash
cp server/.env.example server/.env
Edit server/.env and add your Gemini API key.
```

`4. Start the development servers:`
```bash
npm run dev
```
The client will be available at http://localhost:5173 and the server at http://localhost:3001.

## Available Scripts
* `npm run dev` - Start both client and server in development mode
* `npm run client` - Start only the client
* `npm run server` - Start only the server