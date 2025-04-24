import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DestinationPage from './components/DestinationPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/destination/:id" element={<DestinationPage />} />
    </Routes>
  );
}

export default App;
