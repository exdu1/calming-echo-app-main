import { GoogleGenerativeAI } from "@google/generative-ai";
import config from './config/index.js';



// Validate API key and initialize Gemini API client
function geminiClient() {
  let genAI;
  let geminiModel;
  try {
    const apiKey = config.geminiApiKey;
    if(!apiKey || apiKey == 'your_gemini_api_key_here') {
      console.error('Warning: Gemini API key is not configured or is the default value.');
    } else {
      genAI = new GoogleGenerativeAI(apiKey);
      geminiModel = genAI.getGenerativeModel({ model: config.geminiModel});
      console.log(`Gemini API client initialized with ${config.geminiModel}`);
    }
  } catch (error) {
    console.error('Error initializing Gemini API client:', error.message);
  };
};

export default geminiClient;

