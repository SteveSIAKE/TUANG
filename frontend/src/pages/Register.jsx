import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    telephone: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères !");
      setLoading(false);
      return;
    }

    try {
      await signup(formData.email, formData.password, {
        name: formData.name,
        telephone: formData.telephone
      });
      
      navigate("/dashboard");
    } catch (err) {
      setError("Erreur lors de l'inscription. Vérifiez vos informations.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-500 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-md mx-auto mt-10 p-4 backdrop-blur-lg shadow-md rounded-lg border" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          Inscription
        </h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-800"
          />
          <input
            type="text"
            name="name"
            placeholder="Nom"
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-800"
          />
          <input
            type="text"
            name="telephone"
            placeholder="Téléphone"
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-800"
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 text-gray-600 rounded bg-white dark:bg-gray-800"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 text-gray-600 rounded bg-white dark:bg-gray-800"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">Vous avez déjà un compte ?</p>
          <Link to="/login" className="text-blue-600 hover:underline">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
