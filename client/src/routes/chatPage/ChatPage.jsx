/* /client/src/routes/chatPage/ChatPage.jsx */
import { useState, useEffect, useRef } from 'react';
import './chatPage.css';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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

        const userMessage = {
            text: input,
            isUser: true,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const history = messages.slice(-10);

            const response = await fetch(
                '/api/active-listener', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: input,
                    history,
                }),
            });

            if (!response.ok) {
                throw new Error(
                    `Server error: ${response.status}`
                );
            }

            // Phase 1: Collect the full stream
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullText = '';

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                fullText += decoder.decode(value, { stream: true });
            }

            // Phase 2: Reveal word by word
            const aiMessage = {
                text: '',
                isUser: false,
                timestamp: new Date(),
            };
            setMessages(
                prev => [...prev, aiMessage]
            );
            setIsLoading(false);

            const words = fullText.split(' ');
            let revealed = '';

            for (let i = 0; i < words.length; i++) {
                revealed += (i === 0 ? '' : ' ') + words[i];
                const current = revealed;

                setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                        ...updated[
                            updated.length - 1
                        ],
                        text: current,
                    };
                    return updated;
                });

                await new Promise(
                    r => setTimeout(r, 50)
                );
            }

        } catch (error) {
            console.error(
                'Error communicating with AI:',
                error
            );

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