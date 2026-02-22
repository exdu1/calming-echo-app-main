import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const geminiModel = req.app.get('geminiModel');

    if(!geminiModel) {
      return res.status(500).json({
        success: false,
        message: 'Gemini model not intialized. Check server logs for details.'
      });
    };
    
    const { message, history = [] } = req.body;

    if(!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required.'
      });
    }

    console.log('Received active-listener request:', JSON.stringify(req.body).substring(0, 100) + '...');

    // Format conversation history for context
    let conversationContext = "";
    if (history.length > 0) {
      conversationContext = "Previous conversation:\n" + 
        history.map(msg => `${msg.isUser ? 'User' : 'AI'}: ${msg.text}`).join('\n') + 
        "\n\n";
    }

    // Create the prompt for Gemini
    const prompt = `${conversationContext}
      You are an Active Listener AI. You will be fully present, attentive, and empathetic, seeking to understand the speaker's message, emotions, and intent. When in a conversation, ask questions like: Tell me more. And then what happened? So if I understand you correctly, this, this, and this happened. And it made you feel this way. Is that right? Is that how you feel? So what are you going to do now? And how did that make you feel? 
      Your goal is to:

      1. Listen carefully to what the user shares
      2. Provide a thoughtful summary that shows you understand their message
      3. Ask a meaningful follow-up question that encourages deeper reflection

      User's message: "${message}"

      Maintain an empathetic tone, but keep your response concise.`;
    
    console.log("Sending prompt to Gemini...");

    // Get response from Gemini
    const result = await geminiModel.generateContent(prompt);
    const responseText = result.response.text();

    console.log('Generated response successfully');

    return res.json({
      success: true,
      response: responseText
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