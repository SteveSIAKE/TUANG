import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import  '../index'

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    sexe: "male",
    date_de_naissance: "",
    telephone: "",
    role: "user",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erreur à l'inscription");
      }

      alert("Inscription réussie !");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="py-16 px-4 bg-gradient-to-r from-blue-50 to-blue-500 dark:from-gray-900 dark:to-blue-900">
       
        <div className="max-w-md mx-auto mt-10 p-4 backdrop-blur-lg shadow-md rounded-lg border  ">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
              Créer un compte
            </h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                placeholder="Nom"
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                name="password"
                type="password"
                placeholder="Mot de passe"
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                name="telephone"
                placeholder="Téléphone"
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                name="date_de_naissance"
                type="date"
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />

              <select
                name="sexe"
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="male">Homme</option>
                <option value="female">Femme</option>
              </select>

              {/* rôle caché */}
              <input type="hidden" name="role" value="user" />

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition duration-200"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>
    
    </>
  );
}

export default Register;
