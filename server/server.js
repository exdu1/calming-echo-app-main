// Import packages
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import config, { validateConfig } from './config/index.js';
import activeListenerRouter from './routes/activeListener.js';
import { setupMiddleware } from './middleware/index.js';

// Setup ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Validate configuration at startup and fail fast if misconfigured
if (!validateConfig()) {
  process.exit(1);
};

// Create and configure Express app
const app = express();
setupMiddleware(app);

// Mount routes
app.use('/api/active-listener', activeListenerRouter);

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
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