import { GoogleGenerativeAI } from "@google/generative-ai";
import config from './index.js';


// Validate API key and initialize Gemini API client
const gemini = function initGemini() {
  let genAI;
  let geminiModel;
  try {
    const apiKey = config.geminiApiKey;
    if(!apiKey || apiKey == 'your_gemini_api_key_here') {
      console.error('Warning: Gemini API key is not configured or is the default value.');
      return false;
    } else {
      genAI = new GoogleGenerativeAI(apiKey);
      geminiModel = genAI.getGenerativeModel({ model: config.geminiModel});
      console.log(`Gemini API client initialized with ${config.geminiModel}`);
      return geminiModel;
    }
  } catch (error) {
    console.error('Error initializing Gemini API client:', error.message);
    return false;
  };
};

export default gemini;