// src/routes/homepage/Homepage.jsx
import { Link } from 'react-router-dom';
import './homepage.css';

const Homepage = () => {
    return (
        <div className="homepage">
            <div className="hero">
                <h1>AI Active Listener</h1>
                <p>Share your thoughts and get thoughtful responses</p>
                <div className="actions">
                    <Link to="/chat" className="cta-button">Start Chatting</Link>
                </div>
            </div>
            <div className="features">
                <div className="feature">
                    <h3>Thoughtful Responses</h3>
                    <p>Our AI listens carefully and responds with meaningful questions</p>
                </div>
                <div className="feature">
                    <h3>Private by Design</h3>
                    <p>Your data is encrypted and stays on your device</p>
                </div>
                <div className="feature">
                    <h3>Always Available</h3>
                    <p>Get support and reflection whenever you need it</p>
                </div>
            </div>
        </div>
    );
};

export default Homepage;