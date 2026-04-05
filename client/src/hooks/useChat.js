/* /client/src/hooks/useChat.js */
import { useState } from 'react';

// Factory to create a message object with consistent structure
const createMessage = (text, { isUser = false, isError = false} = {}) => ({
  text,
  isUser,
  isError,
  timestamp: new Date(),
});

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text) => {
    const userMessage = createMessage(text, { isUser: true});
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const history = messages.slice(-10);

      const response = await fetch(
        './api/active-listener', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: text,
            history,
          }),
        }
      );

      if(!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      // Phase 1: Collect the full stream of the AI message response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
      }

      // Phase 2: Reveal the AI message response word by word
      const aiMessage = createMessage('');
      setMessages( prev => [...prev, aiMessage]);
      setIsLoading(false);

      const words = fullText.split(' ');
      let revealed = '';

      for (let i = 0; i < words.length; i++) {
        revealed += (i === 0 ? '': ' ') + words[i];
        const current = revealed;

        setMessages (prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            text: current,
          };
          return updated;
        });

        await new Promise(r => setTimeout(r, 50));
      }
    } catch (error) {
      console.log('Error communicating with AI:', error);
      const errorMessage = createMessage("Sorry, I couldn't connect to the AI service. Please try again later.", { isError : true });
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return { messages, isLoading, sendMessage };
};

export default useChat;