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

    // Set streaming headers
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    // Get response from Gemini using system instruction and structured contents
    const result = await ai.models.generateContentStream({
      model: config.geminiModel,
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });

    for await (const chunk of result) {
      res.write(chunk.text);
    };
    console.log('Generated response successfully');
    res.end();

  } catch (error) {
    console.error('Active listener request failed:', error);

    // If headers haven't been sent, send a JSON error
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: 'Failed to process your message.',
        error: error.message
      });
    } 

    // If streaming has already started, close the connection
    res.send();
  }
});

export default router;