import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './chatPage.css';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const hasMessages = messages.length > 0;
    
    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    // Focus input on load
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!input.trim()) return;
        
        const userMessage = { text: input, isUser: true, timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        
        try {
            const history = messages.slice(-10);
            
            const response = await axios.post('/api/active-listener', {
                message: input,
                history
            });
            
            const aiMessage = { 
                text: response.data.response, 
                isUser: false, 
                timestamp: new Date(),
            };
            
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error communicating with AI:', error);
            
            setMessages(prev => [
                ...prev, 
                { 
                    text: "Sorry, I couldn't connect to the AI service. Please try again later.", 
                    isUser: false, 
                    isError: true,
                    timestamp: new Date() 
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const hasInput = input.trim().length > 0;

    return (
        <div className="chat-page">
            {!hasMessages ? (
                <div className="welcome">
                    <div className="welcome-text">
                        <h1>Calming Echo</h1>
                        <p>What's on your mind?</p>
                    </div>
                    <form className="input-form input-form--welcome" onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                                ref={inputRef}
                            />
                            <button 
                                type="submit" 
                                disabled={isLoading || !hasInput}
                                className="send-button"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <div className="messages-area">
                        <div className="messages-scroll">
                            {messages.map((msg, index) => (
                                <div 
                                    key={index} 
                                    className={`message ${msg.isUser ? 'user-message' : 'ai-message'} ${msg.isError ? 'error-message' : ''}`}
                                >
                                    <div className="message-bubble">
                                        <p>{msg.text}</p>
                                    </div>
                                    <div className="message-time">
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    <div className="input-area">
                        <form className="input-form" onSubmit={handleSubmit}>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    disabled={isLoading}
                                    ref={inputRef}
                                />
                                <button 
                                    type="submit" 
                                    disabled={isLoading || !hasInput}
                                    className="send-button"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13"></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default ChatPage;