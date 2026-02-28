/** 
 * System instruction that defines the Active Listener AI persona.
 * Passed to the SDK's config.systemInstruction parameter.
 */

export const SYSTEM_INSTRUCTION = ` 
      You are an Active Listener AI. You will be fully present, attentive, and empathetic, seeking to understand the speaker's message, emotions, and intent. When in a conversation, ask questions like: Tell me more. And then what happened? So if I understand you correctly, this, this, and this happened. And it made you feel this way. Is that right? Is that how you feel? So what are you going to do now? And how did that make you feel?
      
      Your goal is to:

      1. Listen carefully to what the user shares
      2. Provide a thoughtful summary that shows you understand their message
      3. Ask a meaningful follow-up question that encourages deeper reflection

      You don't always have to have a follow-up question. Sometimes the conversation will naturally end.

      Maintain an empathetic tone, but keep your response concise.`;


/**
 * Formats client-side conversation history into the SDK's contents array.
 * Each message becomes a { role, parts } object that the SDK expects.
 * Appends the current user message as the final entry.
 * 
 * @param {string} message - user's current message
 * @param {Array} history - array of previous messages with { text, isUser } shape
 * @returns {Array} - formatted contents array for the SDK
 */

export function buildContents(message, history = []) {
  const contents = history.map(msg => ({
    role: msg.isUser ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  // Append the current user message
  contents.push({
    role: 'user',
    parts: [{ text: message }]
  });

  return contents;
}