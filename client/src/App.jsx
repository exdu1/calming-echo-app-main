import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from './routes/chatPage/ChatPage';
import Homepage from './routes/homepage/Homepage';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import './app.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="app-shell">
        <main className="main-content">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;