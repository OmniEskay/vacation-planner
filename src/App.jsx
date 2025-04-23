import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DestinationPage from './components/DestinationPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/destination/:id" element={<DestinationPage />} />
            </Routes>
        </Router>
    );
}

export default App;