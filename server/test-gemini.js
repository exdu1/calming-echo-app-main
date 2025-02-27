// Import required packages
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Set up environment variables
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
  process.exit(1);
}

// Load environment variables
dotenv.config();

// Test function to run the Gemini API
async function testGeminiAPI() {
  try {
    // Get API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      console.error('Error: Gemini API key not configured. Please add your key to the .env file.');
      return;
    }
    
    console.log('Initializing Gemini API with your key...');
    
    // Initialize the Google Generative AI with your API key
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Get the generative model (gemini-1.5-flash)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Define the prompt
    const prompt = "Explain how AI works";
    
    console.log(`Sending prompt: "${prompt}"`);
    
    // Generate content
    const result = await model.generateContent(prompt);
    
    // Get the response text
    const responseText = result.response.text();
    
    // Log the response
    console.log('\nGemini API Response:');
    console.log('===================');
    console.log(responseText);
    console.log('===================');
    console.log('\nAPI test completed successfully!');
    
  } catch (error) {
    console.error('Error testing Gemini API:', error.message);
    if (error.message.includes('API key')) {
      console.log('Please check that your API key is valid and properly configured in the .env file.');
    }
  }
}

// Run the test
testGeminiAPI();