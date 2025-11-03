// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 1. Importe
import App from './App';
import './index.css'; // ou App.css, o que for seu global

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* 2. Envolva o App */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);