// Import packages
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check for .env file and create it if it doesn't exist
const envPath = join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  fs.writeFileSync(
    envPath,
    'GEMINI_API_KEY=your_gemini_api_key_here\nPORT=3001\n'
  );
  console.log('.env file created. Please add your Gemini API key.');
}

dotenv.config();  // load environment variables from .env file

// Create the express app
const app = express();  // create instance of express app

// Simple CORS setup for local development
app.use(cors());

app.use(express.json());  // setup automatic json parsing from request bodies

// Initialize the Gemini API client
let genAI;
let geminiModel;

try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.error('Warning: Gemini API key not configured or is the default value.');
  } else {
    genAI = new GoogleGenerativeAI(apiKey);
    geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log('Gemini API client initialized successfully.');
  }
} catch (error) {
  console.error('Error initializing Gemini API client:', error.message);
}

// Test endpoint to verify Gemini API key
app.get('/api/test-gemini', async (req, res) => {
  try {
    // Check if API key exists
    const apiKey = process.env.GEMINI_API_KEY;
    
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
You are an Active Listener AI. Your goal is to:
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

// Serve static files from the React app build directory
const clientBuildPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientBuildPath));

// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Start express server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));