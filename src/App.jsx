import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import DestinationDetails from './pages/DestinationDetails';
import MyTrip from './pages/MyTrip';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="destination/:id" element={<DestinationDetails />} />
          <Route path="my-trip" element={<MyTrip />} />
          <Route path="*" element={
            <div className="text-center py-16">
              <h1 className="text-4xl font-bold mb-4">404</h1>
              <h2 className="text-2xl mb-6">Page Not Found</h2>
              <p>The page you're looking for doesn't exist or has been moved.</p>
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;