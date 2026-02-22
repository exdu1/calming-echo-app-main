// Import packages
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { GoogleGenerativeAI } from "@google/generative-ai";
import config from './config/index.js';
import gemini from './config/gemini.js';


// Setupp ES modules
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
let geminiModel = gemini();

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Backend is running',
    env: config.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

// Test endpoint to verify Gemini API key
app.get('/api/test-gemini', async (req, res) => {
  try {
    // Check if API key exists
    const apiKey = config.geminiApiKey;
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return res.status(500).json({ 
        success: false, 
        message: 'Gemini API key not configured. Please add your key to the .env file.' 
      });
    }
    
    if (!geminiModel) {
      return res.status(500).json({
        success: false,
        message: 'Gemini model not initialized. Check server logs for details.'
      });
    }
    
    // Test the model with a simple prompt
    const prompt = "Respond with a simple 'API connection successful' message";
    const result = await geminiModel.generateContent(prompt);
    const responseText = result.response.text();
    
    return res.json({ 
      success: true, 
      message: 'Gemini API connection successful',
      modelResponse: responseText
    });
    
  } catch (error) {
    console.error('Gemini API test failed:', error.message);
    return res.status(500).json({ 
      success: false, 
      message: 'Gemini API test failed',
      error: error.message
    });
  }
});

// Active Listener endpoint
app.post('/api/active-listener', async (req, res) => {
  try {
    console.log('Received active-listener request:', JSON.stringify(req.body).substring(0, 100) + '...');
    
    if (!geminiModel) {
      return res.status(500).json({
        success: false,
        message: 'Gemini model not initialized. Check server logs for details.'
      });
    }
    
    const { message, history = [] } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Message is required' 
      });
    }
    
    // Format conversation history for context
    let conversationContext = "";
    if (history.length > 0) {
      conversationContext = "Previous conversation:\n" + 
        history.map(msg => `${msg.isUser ? 'User' : 'AI'}: ${msg.text}`).join('\n') + 
        "\n\n";
    }
    
    // Create the prompt for Gemini
    const prompt = `${conversationContext}
      You are an Active Listener AI. You will be fully present, attentive, and empathetic, seeking to understand the speaker's message, emotions, and intent. When in a conversation, ask questions like: Tell me more. And then what happened? So if I understand you correctly, this, this, and this happened. And it made you feel this way. Is that right? Is that how you feel? So what are you going to do now? And how did that make you feel? 
      Your goal is to:

      1. Listen carefully to what the user shares
      2. Provide a thoughtful summary that shows you understand their message
      3. Ask a meaningful follow-up question that encourages deeper reflection

      User's message: "${message}"

      Respond in the following format:
      SUMMARY: [A concise summary showing you understand what they've shared. Be empathetic and reflective.]
      QUESTION: [A single, thoughtful follow-up question. Keep it open-ended and focused on the user's sharing.] 
      Maintain an empathetic tone, but keep your response concise.`;
    
    console.log("Sending prompt to Gemini...");
    
    // Get response from Gemini
    const result = await geminiModel.generateContent(prompt);
    const responseText = result.response.text();
    
    // Parse the response to extract summary and question
    const summaryMatch = responseText.match(/SUMMARY:\s*([\s\S]*?)(?=QUESTION:|$)/i);
    const questionMatch = responseText.match(/QUESTION:\s*([\s\S]*?)(?=$)/i);
    
    const summary = summaryMatch ? summaryMatch[1].trim() : "I understand what you're sharing.";
    const question = questionMatch ? questionMatch[1].trim() : "Is there anything else you'd like to talk about?";
    
    console.log('Generated response successfully');
    
    return res.json({
      success: true,
      summary,
      question
    });
    
  } catch (error) {
    console.error('Active listener request failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process your message',
      error: error.message
    });
  }
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