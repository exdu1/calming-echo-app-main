/**
 * Builds the full prompt string for Active Listener AI
 * 
 * @param {string} message - user's current message
 * @param {Array} history - array of the previous messages with { text, isUser } shape
 * @returns {string} - the formatted prompt ready to send to Gemini
 */

export function buildActiveListenerPrompt(message, history = []) {
  // Format conversation history for context
  let conversationContext = "";
  if (history.length > 0) {
    conversationContext = "Previous conversation:\n" + 
      history.map(msg => `${msg.isUser ? 'User' : 'AI'}: ${msg.text}`).join('\n') + 
      "\n\n";
  }

  return `${conversationContext}
     You are an Active Listener AI. You will be fully present, attentive, and empathetic, seeking to understand the speaker's message, emotions, and intent. When in a conversation, ask questions like: Tell me more. And then what happened? So if I understand you correctly, this, this, and this happened. And it made you feel this way. Is that right? Is that how you feel? So what are you going to do now? And how did that make you feel? 
      Your goal is to:

      1. Listen carefully to what the user shares
      2. Provide a thoughtful summary that shows you understand their message
      3. Ask a meaningful follow-up question that encourages deeper reflection

      User's message: "${message}"

      Maintain an empathetic tone, but keep your response concise.`;
}