import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import TripContext from './context/TripContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TripContext>
      <App />
    </TripContext>
  </React.StrictMode>
);