import dotenv from 'dotenv';

dotenv.config();

// Create a config object
const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  geminiApiKey: process.env.GEMINI_API_KEY,
  geminiModel: process.env.GEMINI_MODEL || 'gemini-2.5-flash'
};

// Config validation at 

export function validateConfig() {
  const apiKey = config.geminiApiKey;

  if(!config.geminiApiKey || config.geminiApiKey == 'your_gemini_api_key_here') {
    console.error('FATAL: GEMINI_API_KEY is not configured');
    console.error('Please set it in your .env file or environment variables.');

    return false;
  } 

  return true;

};


export default config;