import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TaskContextProvider } from './Context/ContextAPI';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <TaskContextProvider>
        <App />
    </TaskContextProvider>
);

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}


