import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import UserService from './service/userServce';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

UserService.initKeycloak(() => {
  const root = ReactDOM.createRoot(rootElement);  root.render(
    <React.StrictMode>
          <App />
    </React.StrictMode>
  );
});