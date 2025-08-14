// Menu latéral pour l'administration

import { Link } from "react-router-dom";
import { Home, Info, Settings } from "lucide-react";

function Sidebar() {
  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100 dark:bg-gray-800">
      <Link to="/" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500">
        <Home className="w-5 h-5" />
        Accueil
      </Link>
      <Link to="/about" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500">
        <Info className="w-5 h-5" />
        À propos
      </Link>       
      <Link to="/services" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500">
        <Settings className="w-5 h-5" />
        Services
      </Link>
    </div>
  );
}

export default Sidebar;