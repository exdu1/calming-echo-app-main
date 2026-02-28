import { GoogleGenAI } from "@google/genai";
import config from './index.js';

let geminiClient= null;

// Validate API key and initialize Gemini API client
export function initGemini() {
  try {
    geminiClient = new GoogleGenAI({ apiKey: config.geminiApiKey });
    console.log('Gemini API client initialized.');
    return true;
    } catch (error) {
      console.error('Error initializing Gemini API client:', error.message);
      return false;
  };
};

export function getModel() {
  return geminiModel;
};