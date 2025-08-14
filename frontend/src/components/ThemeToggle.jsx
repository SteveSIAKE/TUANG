import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-2 px-3 py-1 border rounded border-gray-400 dark:border-gray-600"
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
      <span className="text-sm">{theme === "dark" ? "Clair" : "Sombre"}</span>
    </button>
  );
}
