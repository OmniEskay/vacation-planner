import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar'; 
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar /> 
      <div className="min-h-screen"> 
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer /> 
    </Router>
  );
}

export default App;