import logo from "../assets/images/TUANG_LOGO.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="w-1/12 h-1/3">
          <img src={logo} alt="logo" />
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
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-900"
          >
            Connexion
          </Link>
          <Link
            to="/register"
            className=" bg-white px-4 py-2 border border-primary rounded-md text-sm font-medium  dark:text-blue-500  hover:text-blue-900"
          >
            Inscription
          </Link>
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
