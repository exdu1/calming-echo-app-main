// Import required packages
import ai from '../config/gemini.js';
import config, { validateConfig } from '../config/index.js';
import { SYSTEM_INSTRUCTION } from '../prompts/activeListenerPrompt.js';



// Test function to run the Gemini API
async function testGeminiAPI() {
  try {
    if (!validateConfig()) {
      return;
    }

    console.log('Testing Gemini API.');
    const prompt = "I'm feeling stressed out. I'm trying to learn how to code, but I default to using AI rather than pushing through the challenge of debugging myslef because it's frustrating and time consuming. I feel conflicted between learning efficiently, and 'trial by fire'.";
    console.log(`Sending prompt: "${prompt}"`);

    const result = await ai.models.generateContentStream({
      model: config.geminiModel,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      }
    })
    // Log the response
    console.log('\nGemini API Response:');
    console.log('===================');
    
    let chunkCount = 0;
    for await (const chunk of result) {
      chunkCount++;
      console.log(`${chunkCount}: ${chunk.text}`);
    }
    
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