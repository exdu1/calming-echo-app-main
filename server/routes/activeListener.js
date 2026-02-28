import express from 'express';
import ai from '../config/gemini.js';
import config from '../config/index.js';
import { SYSTEM_INSTRUCTION, buildContents } from '../prompts/activeListenerPrompt.js';

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
    const contents = buildContents(message, history);
    console.log("Sending prompt to Gemini...");

    // Get response from Gemini using system instruction and structured contents
    const result = await ai.models.generateContent({
      model: config.geminiModel,
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      }
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