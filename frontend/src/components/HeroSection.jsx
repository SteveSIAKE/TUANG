import { Link } from "react-router-dom";
import Illustration from "../assets/images/devices-animate.svg";

export default function HeroSection() {
  return (
    <section className=" py-16 bg-gradient-to-r from-blue-50 to-blue-500 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Texte principal */}
        <div className="md:w-1/2 text-center md:text-left  ">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Réservez vos{" "}
            <span className="text-blue-500"> billets de train </span> en toute
            simplicité
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Gagnez du temps avec notre plateforme rapide, fiable et 100% en
            ligne !.
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-primary text-black  rounded-md hover:bg-primary/80 dark:text-gray-300"
            >
              Créer un compte
            </Link>
            <Link
              to="/recherche"
              className="bg-blue-500 px-6 py-3 border border-primary text-white rounded-md hover:bg-primary hover:text-white"
            >
              Rechercher un trajet
            </Link>
          </div>
        </div>

        {/* Illustration ou image */}
        <div className="md:w-1/2">
          <img
            src={Illustration}
            alt="Illustration train"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
