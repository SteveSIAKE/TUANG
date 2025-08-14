import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Importation du fichier CSS
// import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx'; // Import du ThemeProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    {/* </BrowserRouter> */}
  </React.StrictMode>
);