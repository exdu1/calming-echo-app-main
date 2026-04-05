/* /client/src/routes/chatPage/ChatPage.jsx */
import { useState, useEffect, useRef } from 'react';
import useChat from '../../hooks/useChat'; 
import './chatPage.css';

const ChatPage = () => {
    const { messages, isLoading, sendMessage } = useChat();
    const [input, setInput] = useState('');
    const scrollContainerRef = useRef(null);
    const inputRef = useRef(null);

    const hasMessages = messages.length > 0;

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
        });
    }, [messages, isLoading]);

    // Focus input on load
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        sendMessage(input);
        setInput('');
    };

    const hasInput = input.trim().length > 0;

    return (
        <div className="chat-page">
            {!hasMessages ? (
                <div className="welcome">
                    <div className="welcome-text">
                        <h1>Hi there.</h1>
                    </div>
                    <form
                        className="input-form input-form--welcome"
                        onSubmit={handleSubmit}
                    >
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="How is your day going?"
                                value={input}
                                onChange={(e) =>
                                    setInput(e.target.value)
                                }
                                disabled={isLoading}
                                ref={inputRef}
                            />
                            <button
                                type="submit"
                                disabled={
                                    isLoading || !hasInput
                                }
                                className="send-button"
                            >
                                <span className="material-symbols-rounded">
                                    send
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <div className="messages-area">
                        <div
                            className="messages-scroll"
                            ref={scrollContainerRef}
                        >
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`message ${
                                        msg.isUser
                                            ? 'user-message'
                                            : 'ai-message'
                                    } ${
                                        msg.isError
                                            ? 'error-message'
                                            : ''
                                    }`}
                                >
                                    <div className="message-bubble">
                                        <p>{msg.text}</p>
                                    </div>
                                    <div className="message-time">
                                        {msg.timestamp.toLocaleTimeString(
                                            [],
                                            {
                                                hour: '2-digit',
                                                minute: '2-digit'
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

                    <div className="input-area">
                        <form
                            className="input-form"
                            onSubmit={handleSubmit}
                        >
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    placeholder="How is your day going?"
                                    value={input}
                                    onChange={(e) =>
                                        setInput(e.target.value)
                                    }
                                    disabled={isLoading}
                                    ref={inputRef}
                                />
                                <button
                                    type="submit"
                                    disabled={
                                        isLoading || !hasInput
                                    }
                                    className="send-button"
                                >
                                    <span className="material-symbols-rounded">
                                        send
                                    </span>
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