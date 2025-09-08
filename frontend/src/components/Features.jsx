import { FaSearch, FaLock, FaClock, FaMobileAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaSearch className="text-3xl text-blue-600" />,
    title: "Recherche rapide de billets",
    description: "Trouvez votre itinéraire en quelques secondes.",
  },
  {
    icon: <FaLock className="text-3xl text-green-600" />,
    title: "Paiement sécurisé",
    description: "Vos transactions sont protégées de bout en bout.",
  },
  {
    icon: <FaClock className="text-3xl text-yellow-600" />,
    title: "Réservation 24h/24",
    description: "Réservez vos billets à tout moment, où que vous soyez.",
  },
  {
    icon: <FaMobileAlt className="text-3xl text-purple-600" />,
    title: "Application mobile",
    description: "Profitez de notre application pour une expérience fluide.",
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white">
          Fonctionnalités clés
        </h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4" data-aos="fade-up">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
