/* /client/src/routes/chatPage/ChatPage.jsx */
import useChat from '../../hooks/useChat'; 
import MessageList from '../../components/MessageList';
import ChatInput from '../../components/ChatInput';
import './chatPage.css';

const ChatPage = () => {
    const { messages, isLoading, sendMessage } = useChat();
    const hasMessages = messages.length > 0;

    return (
        <div className="chat-page">
            {!hasMessages ? (
                <div className="welcome">
                    <div className="welcome-text">
                        <h1>Hi there.</h1>
                    </div>
                    <ChatInput
                        onSend={sendMessage}
                        isLoading={isLoading}
                        variant="welcome"
                        placeholder="How are you right now?"
                    />
                </div>
            ) : (
                <>
                    <MessageList messages={messages} isLoading={isLoading}/>
                    <ChatInput onSend={sendMessage} isLoading={isLoading}/>
                </>
            )}
        </div>
    );
};

export default ChatPage;