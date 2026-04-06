/* /client/src/components/MessageList.jsx */
import {useEffect, useRef } from 'react';
import './messageList.css';

// Helper function to determine message class
const getMessageClass = (msg) => {
  const classes = ['message'];
  classes.push(msg.isUser ? 'user-message' : 'ai-message');

  if (msg.isError)
    classes.push('error-message');

  return classes.join(' ');
};

const MessageList = ({ messages, isLoading }) => {
  const scrollContainerRef = useRef(null);

  // Auto-scrol to bottom when messsages change
  useEffect(() => {
    const container = scrollContainerRef.current;
    if(!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isLoading]);

  return (
    <div className="messages-area">
      <div className="messages-scroll" ref={scrollContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} className={getMessageClass(msg)}>
            <div className="message-bubble">
              <p>{msg.text}</p>
            </div>
            <div className="message-time">
              {msg.timestamp.toLocaleTimeString(
                [],
                {
                  hour: '2-digit',
                  minute: '2-digit',
                }
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message ai-message loading-message">
            <div className="message-bubble">
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>  
    </div>
  );
};

export default MessageList;