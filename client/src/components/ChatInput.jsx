/* /client/src/components/ChatInput.jsx */
import { useState, useEffect, useRef } from 'react';
import './chatInput.css';

const ChatInput = ({
    onSend,
    isLoading,
    variant,
    placeholder = "What're you saying right now?",
}) => {
    const [input, setInput] = useState('');
    const inputRef = useRef(null);

    const hasInput = input.trim().length > 0;

    // Focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        onSend(input);
        setInput('');

        // Reset textarea height after sending
        const textarea = inputRef.current;
        if (textarea) textarea.style.height = 'auto';
    };

    // Enter sends, Shift+Enter adds a new line
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    // Auto-resize textarea to fit content
    const handleChange = (e) => {
        setInput(e.target.value);
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height =
            textarea.scrollHeight + 'px';
    };

    // Resolve variant-specific values once
    const isWelcome = variant === 'welcome';

    const formClass = isWelcome
        ? 'input-form input-form--welcome'
        : 'input-form';

    const content = (
        <form
            className={formClass}
            onSubmit={handleSubmit}
        >
            <div className="input-wrapper">
                <textarea
                    rows={1}
                    placeholder={placeholder}
                    value={input}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
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
    );

    return isWelcome
        ? content
        : <div className="input-area">
            {content}
          </div>;
};

export default ChatInput;
