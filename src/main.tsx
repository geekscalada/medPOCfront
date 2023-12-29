import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';


const container = document.getElementById('root');
const root = createRoot(container!);
// Manera de renderizar la aplicación en el DOM
// Nuevas características de React 18 como el modo concurrente
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);