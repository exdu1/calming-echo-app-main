import { GoogleGenerativeAI } from "@google/generative-ai";
import config from './index.js';

let geminiModel = null;

// Validate API key and initialize Gemini API client
export function initGemini() {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    geminiModel = genAI.getGenerativeModel({ model: config.geminiModel});
    console.log(`Gemini API client initialized with ${config.geminiModel}`);
    return true;
    } catch (error) {
      console.error('Error initializing Gemini API client:', error.message);
      return false;
  };
};

export function getModel() {
  return geminiModel;
};