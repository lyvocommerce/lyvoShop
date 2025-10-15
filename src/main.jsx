import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App.jsx';

// Если захочешь — сюда можно импортировать свои дополнительные стили
// import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);