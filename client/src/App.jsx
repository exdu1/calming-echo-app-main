import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from './routes/chatPage/ChatPage';
import Dashboard from './routes/dashboard/Dashboard';
import Homepage from './routes/homepage/Homepage';
import Navbar from './components/Navbar';
import './app.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="app-shell">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;