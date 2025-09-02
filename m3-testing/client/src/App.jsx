import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import TextBot from './pages/TextBot';
import VoiceBot from './pages/VoiceBot';
import Users from './pages/Users';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">TextBot</Link>
        <Link to="/voicebot">VoiceBot</Link>
        <Link to="/users">Users</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TextBot />} />
        <Route path="/voicebot" element={<VoiceBot />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
