import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Explore from './pages/Explore';
import DestinationDetails from './pages/DestinationDetails';
import MyTrip from './pages/MyTrip';
import NotFound from './pages/NotFound';
import { TripProvider } from './context/TripContext'; 

function App() {
  return (
    <TripProvider>
      <Router>
        <Routes>
            <Route path="/" element={<Layout />}>
            <Route index element={<Explore />} /> 
            <Route path="explore" element={<Explore />} /> 
            <Route path="destination/:id" element={<DestinationDetails />} />
            <Route path="my-trip" element={<MyTrip />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </TripProvider>
  );
}

export default App;