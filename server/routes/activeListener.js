import express from 'express';
import ai from '../config/gemini.js';
import config from '../config/index.js';
import { buildActiveListenerPrompt } from '../prompts/activeListenerPrompt.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if(!message) {
    return res.status(400).json({
      success: false,
      message: 'Message is required.'
    });
  }
    
    console.log('Received active-listener request:', JSON.stringify(req.body).substring(0, 100) + '...');

    // Build the prompt using the extracted prompt module
    const prompt = buildActiveListenerPrompt(message, history);

    console.log("Sending prompt to Gemini...");

    // Get response from Gemini
    const result = await ai.models.generateContent({
      model: config.geminModel,
      contents: prompt
    });

    console.log('Generated response successfully');

    return res.json({
      success: true,
      response: result.text
    });
  } catch (error) {
    console.error('Active listener request failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process your message.',
      error: error.message
    });
  }
});

export default router;