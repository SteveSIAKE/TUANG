import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'aos/dist/aos.css';
import './index.css'; // Importation du fichier CSS
import { ThemeProvider } from './context/ThemeContext.jsx'; // Import du ThemeProvider
import { AuthProvider } from './context/AuthContext.jsx'; // Import du AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
  </React.StrictMode>
);