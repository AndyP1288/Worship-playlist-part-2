import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import './styles.css';

// Registers service worker and logs updates for production diagnostics.
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.info('New app version available. Reload to update.');
  },
  onOfflineReady() {
    console.info('App is ready for offline use.');
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
