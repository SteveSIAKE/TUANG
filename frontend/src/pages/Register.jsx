import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; 

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    telephone: "",
    password: "",
    confirmPassword: "",
    
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      // Création d'un utilisateur dans Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.name,
        formData.telephone,
        formData.password
   
      );

      const user = userCredential.user;
      console.log("Utilisateur créé :", user);

      // Stocker l'UID
      localStorage.setItem("uid", user.uid);

      alert("Inscription réussie !");
      navigate("/login"); // après inscription, rediriger vers login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-500 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-md mx-auto mt-10 p-4 backdrop-blur-lg shadow-md rounded-lg border">
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
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition duration-200"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
