import { FaFacebook, FaTwitter, FaInstagram, FaMoon, FaSun } from 'react-icons/fa';
import { useState } from 'react';

export default function Footer() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setDarkMode(!darkMode);
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Liens utiles */}
        <div>
          <h3 className="font-semibold mb-3">Liens utiles</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Conditions Générales</a></li>
            <li><a href="#" className="hover:underline">Politique de confidentialité</a></li>
            <li><a href="#" className="hover:underline">Aide</a></li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex flex-col items-start">
          <h3 className="font-semibold mb-3">Suivez-nous</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500"><FaFacebook /></a>
            <a href="#" aria-label="Twitter" className="hover:text-sky-400"><FaTwitter /></a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500"><FaInstagram /></a>
          </div>
        </div>

        {/* Langue & Thème */}
        <div className="flex flex-col items-start">
          <h3 className="font-semibold mb-3">Préférences</h3>
          <div className="space-y-3">
            {/* Langue */}
            <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm">
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>

            {/* Thème */}
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 px-3 py-1 border rounded border-gray-400 dark:border-gray-600"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
              <span className="text-sm">{darkMode ? 'Clair' : 'Sombre'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-10 text-gray-400 dark:text-gray-500">
        &copy; {new Date().getFullYear()} #STYVO_SIAK Tous droits réservés.
      </div>
    </footer>
  );
}
