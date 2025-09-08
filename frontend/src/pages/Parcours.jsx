import {FaUserPlus,FaSearch,FaTicketAlt,FaLock,FaMobileAlt,} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Parcours() {
  const steps = [
    {
      icon: <FaUserPlus size={30} />,
      title: "Créez un compte",
      description: "Inscrivez-vous gratuitement en quelques secondes.",
    },
    {
      icon: <FaSearch size={30} />,
      title: "Recherchez un trajet",
      description: "Entrez votre point de départ, destination et date.",
    },
    {
      icon: <FaTicketAlt size={30} />,
      title: "Réservez votre billet",
      description: "Choisissez une place et confirmez la réservation.",
    },
    {
      icon: <FaLock size={30} />,
      title: "Payez en toute sécurité",
      description: "Effectuez votre paiement via une plateforme sécurisée.",
    },
    {
      icon: <FaMobileAlt size={30} />,
      title: "Recevez votre e-billet",
      description: "Recevez votre billet par email ou dans l'application.",
    },
  ];
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/recherche");
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-r  from-gray-50 to-blue-500 dark:from-gray-900 dark:to-blue-900">

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          Comment ça fonctionne ?
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Réservez votre billet en quelques étapes simples et rapides.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up">
          {steps.map((step, index) => (
            <div
              key={index}
              className="shadow-md p-6 rounded-lg text-center backdrop-blur-lg hover:shadow-lg transition"
            >
              <div className="text-blue-500 mb-4 flex justify-center">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center text-center mt-12">
          <button
            onClick={handleStart}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Commencer maintenant
          </button>
        </div>
      </div>
    </section>
  );
}

export default Parcours;
