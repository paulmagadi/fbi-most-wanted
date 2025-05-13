import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FugitiveDetail from './pages/FugitiveDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<FugitiveDetail />} />
    </Routes>
  );
}

export default App;
