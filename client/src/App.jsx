import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from './routes/chatPage/ChatPage';
import Dashboard from './routes/dashboard/Dashboard';
import Homepage from './routes/homepage/Homepage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;