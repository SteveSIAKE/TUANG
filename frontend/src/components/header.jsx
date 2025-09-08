import logo from "../assets/images/TUANG_LOGO.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {FaSignOutAlt, FaUserAlt} from "react-icons/fa";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img 
            src={logo} 
            alt="TUANG Logo" 
            className="h-8 w-auto sm:h-10 md:h-12 lg:h-14 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-700 dark:text-gray-200">
          <Link to="/">Accueil</Link>
          <Link to="/parcours">Parcours</Link>
          <Link to="/recherche">Recherchez un trajet</Link>
          <Link to="/reservation">Mes réservations</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3 ">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 dark:hover:text-blue-600"
          >
            {!currentUser ? "Connexion" : <FaUserAlt className="text-blue-600 text-3xl"/> }
          </Link>
          {!currentUser ? (
            <Link
              to="/register"
              className=" bg-blue-500 hover:bg-blue-600 transition duration-200 text-white hover:text-white  px-4 py-2 border border-primary rounded-md text-sm font-medium dark:bg-white dark:hover:bg-blue-600 dark:text-blue-500  dark:hover:text-white"
            >
              Inscription
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700  transition duration-200 text-white px-4 py-2 rounded-lg "
            >
              <FaSignOutAlt />
              <span>Déconnexion</span>
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="flex flex-col gap-2 item-center md:hidden bg-white dark:bg-gray-900 px-4 py-3 space-y-2 text-gray-700   dark:text-gray-200">
          <Link to="/">Accueil</Link>
          <Link to="/parcours">Parcours</Link>
          <Link to="/recherche">Recherchez un trajet</Link>
          <Link to="/reservation">Mes réservations</Link>
          <Link to="/contact">Contact</Link>
        </div>
      )}
    </header>
  );
}
