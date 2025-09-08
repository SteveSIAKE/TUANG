import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      setError("Erreur de connexion. Vérifiez vos identifiants.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-500 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-md mx-auto mt-10 p-4 backdrop-blur-lg shadow-md rounded-lg border" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          Connexion
        </h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3 text-center">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full border px-3 py-2   bg-white dark:bg-gray-800 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            required
            className="w-full border px-3 py-2    text-gray-600  bg-white dark:bg-gray-800 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white text-center px-4 py-2 rounded w-full hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">Vous n'avez pas de compte ?</p>
          <Link to="/register" className="text-blue-600 hover:underline">
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
