import { Link } from 'react-router-dom';
import './homepage.css';

const Homepage = () => {
    return (
        <div className="homepage">
            <section className="hero">
                <div className="hero-image-container">
                    <img 
                        src="/hero.jpg" 
                        alt="A calm landscape at dusk" 
                        className="hero-image"
                    />
                </div>

                <div className="hero-content">
                    <p className="hero-label">Active Listener</p>
                    <h1>A space to be heard</h1>
                    <Link to="/chat" className="cta-button">Start a Conversation</Link>
                </div>
            </section>

            <section className="features">
                <div className="features-inner">
                    <div className="feature">
                        <span className="material-symbols-rounded feature-icon">psychology</span>
                        <h3>Thoughtful Responses</h3>
                        <p>An AI that listens carefully and responds with meaningful questions</p>
                    </div>
                    <div className="feature">
                        <span className="material-symbols-rounded feature-icon">lock</span>
                        <h3>Private by Design</h3>
                        <p>Your conversations stay between you and the screen</p>
                    </div>
                    <div className="feature">
                        <span className="material-symbols-rounded feature-icon">schedule</span>
                        <h3>Always Available</h3>
                        <p>Reflection and support whenever you need it</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Homepage;