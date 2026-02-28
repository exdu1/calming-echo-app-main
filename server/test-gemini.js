// Import required packages
import ai from './config/gemini.js';
import config, { validateConfig } from './config/index.js';



// Test function to run the Gemini API
async function testGeminiAPI() {
  try {
    if (!validateConfig()) {
      return;
    }

    console.log('Testing Gemini API.');
    const prompt = 'Explain how AI works';
    console.log(`Sending prompt: "${prompt}"`);

    const result = await ai.models.generateContent({
      model: config.geminiModel,
      contents: prompt
    })
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