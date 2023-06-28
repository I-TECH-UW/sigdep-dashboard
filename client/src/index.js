import React from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');
createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

registerServiceWorker();
