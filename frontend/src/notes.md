
//me permet de proteger mes routes
<Route
  path="/dashboard"
  element={
    isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
  }
/>

// Rediriger après une action
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // après la connexion...
    navigate('/'); // redirige vers la page d’accueil
  };
}

