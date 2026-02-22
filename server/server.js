// Import packages
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import config, { validateConfig } from './config/index.js';
import { initGemini} from './config/gemini.js';
import activeListenerRouter from './routes/activeListener.js';

// Setup ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create and configure Express app
const app = express();
app.use(cors()); // CORS - accept all origins in development, specific in production
app.use(express.json()); // JSON parsing for API requests

// Add a request logger for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Initialize the Gemini client
if (validateConfig()) {
  initGemini();
};

// Mount routes
app.use('/api/acitve-listner', activeListenerRouter);

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Backend is running',
    env: config.nodeEnv,
    timestamp: new Date().toISOString()
  });
});



// Serve static files from the React app build directory in production
if (config.nodeEnv === 'production') {
  const clientBuildPath = path.join(__dirname, '../client/dist');
  console.log(`Serving static files from: ${clientBuildPath}`);
  
  app.use(express.static(clientBuildPath));
  
  // All other GET requests not handled before will return the React app
  app.get('*', (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Start express server to listen on port 3001
app.listen(config.port, () => console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`));