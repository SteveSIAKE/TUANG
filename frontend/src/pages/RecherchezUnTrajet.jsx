import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChair, FaTrain, FaClock, FaMapMarkerAlt, FaEuroSign } from "react-icons/fa";
import { trainsService, reservationsService } from "../services/firestore";
import { useAuth } from "../context/AuthContext";

export default function RecherchezUnTrajet() {
  const navigate = useNavigate();
  const location = useLocation();
  const existingData = location.state;
  const { currentUser } = useAuth();

  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState(existingData || {
      typeTrajet: "allerSimple",
      depart: "",
      destination: "",
      dateAller: today,
      dateRetour: today,
      classe: "",
      place: "",
    }
  );

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Effacer l'erreur quand l'utilisateur corrige
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.depart)
      newErrors.depart = "Veuillez sélectionner une gare de départ";
    if (!formData.destination)
      newErrors.destination = "Veuillez sélectionner une destination";
    if (formData.depart === formData.destination)
      newErrors.destination = "La destination doit être différente du départ";
    if (!formData.dateAller)
      newErrors.dateAller = "Veuillez sélectionner une date";
    if (formData.typeTrajet === "allerRetour" && !formData.dateRetour) {
      newErrors.dateRetour = "Veuillez sélectionner une date de retour";
    }
    if (!formData.classe) newErrors.classe = "Veuillez sélectionner une classe";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSearching(true);
    setShowResults(false);
    
    try {
      const trains = await trainsService.searchTrains(formData.depart, formData.destination, formData.dateAller);
      setSearchResults(trains);
      setShowResults(true);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      alert('Erreur lors de la recherche de trains');
    } finally {
      setIsSearching(false);
    }
  };

  const handleReservation = async (train) => {
    if (!currentUser) {
      alert('Veuillez vous connecter pour faire une réservation');
      navigate('/login');
      return;
    }

    if (!selectedSeat) {
      alert('Veuillez sélectionner une place');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const reservationData = {
        userId: currentUser.uid,
        trainId: train.id,
        trainNom: train.nom,
        depart: formData.depart,
        destination: formData.destination,
        dateAller: formData.dateAller,
        dateRetour: formData.typeTrajet === 'allerRetour' ? formData.dateRetour : null,
        classe: formData.classe,
        place: selectedSeat,
        prix: train.prix[formData.classe],
        heureDepart: train.heureDepart,
        heureArrivee: train.heureArrivee,
        duree: train.duree,
        typeTrajet: formData.typeTrajet
      };

      const reservationId = await reservationsService.createReservation(reservationData);
      alert('Réservation créée avec succès !');
      navigate('/reservation');
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      alert('Erreur lors de la création de la réservation');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="py-16 px-4 text-center  text-gray-600 bg-gradient-to-r from-blue-50 to-blue-500 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-md " data-aos="fade-up">
        <form onSubmit={handleSearch} className="space-y-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-600 dark:text-gray-300">
            Recherchez un trajet
          </h2>

          <div className="mb-4">
            <label className="font-medium block mb-2">Type de trajet :</label>
            <div className="flex  justify-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="typeTrajet"
                  value="allerSimple"
                  checked={formData.typeTrajet === "allerSimple"}
                  onChange={handleChange}
                  className="mr-2 "
                />
                Aller simple
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="typeTrajet"
                  value="allerRetour"
                  checked={formData.typeTrajet === "allerRetour"}
                  onChange={handleChange}
                  className="mr-2 "
                />
                Aller-retour
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Classe</label>
            <select
              name="classe"
              value={formData.classe}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionnez votre Classe </option>
              <option value="economique">Classe eonomique</option>
              <option value="premiere">Premiere Classe</option>
              <option value="premiere">Classe business</option>
            </select>
            {errors.classe && (
              <p className="text-red-500 text-sm mt-1">{errors.classe}</p>
            )}
          </div>

          {/* Champ Départ */}
          <div>
            <label className="block mb-1 font-medium">Gare de départ</label>
            <select
              name="depart"
              value={formData.depart}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionnez une gare</option>
              <option value="Yaoundé">Gare de Yaoundé</option>
              <option value="Obala">Gare Obala</option>
              <option value="Ngaoundéré">Gare centrale de Ngaoundéré</option>
              <option value="Bassa">Gare de Bassa</option>
              <option value="Batchenga">Gare de Batchenga</option>
              <option value="Bawa">Gare de Bawa</option>
              <option value="Belabo">Gare de Belabo</option>
              <option value="Bessengué">Gare de Bessengué</option>
              <option value="Binguéla">Gare de Binguéla</option>
              <option value="Edéa">Gare de Edéa</option>
              <option value=" Mbandjok">Gare de Mbandjok</option>
            </select>
            {errors.depart && (
              <p className="text-red-500 text-sm mt-1">{errors.depart}</p>
            )}
          </div>

          {/* Champ Destination */}
          <div>
            <label className="block mb-1 font-medium">
              Gare de destination
            </label>
            <select
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionnez une gare</option>
              <option value="Yaoundé">Gare de Yaoundé</option>
              <option value="Obala">Gare Obala</option>
              <option value="Ngaoundéré">Gare centrale de Ngaoundéré</option>
              <option value="Bassa">Gare de Bassa</option>
              <option value="Batchenga">Gare de Batchenga</option>
              <option value="Bawa">Gare de Bawa</option>
              <option value="Belabo">Gare de Belabo</option>
              <option value="Bessengué">Gare de Bessengué</option>
              <option value="Binguéla">Gare de Binguéla</option>
              <option value="Edéa">Gare de Edéa</option>
              <option value=" Mbandjok">Gare de Mbandjok</option>
            </select>
            {errors.destination && (
              <p className="text-red-500 text-sm mt-1">{errors.destination}</p>
            )}
          </div>

          {/* Date aller */}
          <div>
            <label className="block mb-1 font-medium">
              Date{" "}
              {formData.typeTrajet === "allerRetour" ? "d'aller" : "de voyage"}
            </label>
            <input
              type="date"
              name="dateAller"
              min={today}
              value={formData.dateAller}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.dateAller && (
              <p className="text-red-500 text-sm mt-1">{errors.dateAller}</p>
            )}
          </div>

          {/* Date retour (conditionnelle) */}
          {formData.typeTrajet === "allerRetour" && (
            <div>
              <label className="block mb-1 font-medium">Date de retour</label>
              <input
                type="date"
                name="dateRetour"
                min={formData.dateAller || today}
                value={formData.dateRetour}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.dateRetour && (
                <p className="text-red-500 text-sm mt-1">{errors.dateRetour}</p>
              )}
            </div>
          )}

          {/* Sélection de place */}
          <div className="pt-4">
            <h3 className="text-xl font-medium mb-4 text-center">
              Choisir votre place
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(20)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedSeat(i + 1)}
                  className={`p-2 border rounded transition ${
                    selectedSeat === i + 1
                      ? "bg-blue-500 text-white border-blue-500"
                      : "hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  <FaChair
                    className={`text-2xl transition-colors duration-200 ${
                      selectedSeat === i + 1 ? "text-white" : "text-gray-500"
                    }`}
                  />
                  {i + 1}
                </button>
              ))}
            </div>
            {!selectedSeat && (
              <p className="text-red-500 text-sm mt-2 text-center">
                Veuillez sélectionner une place
              </p>
            )}
          </div>
          {/* Affichage de la place sélectionnée */}
          {selectedSeat && (
            <div className="mt-4">
              <h4 className="font-medium">Place sélectionnée :</h4>
              <p className="text-lg">{selectedSeat}</p>
            </div>
          )}

          {/* Bouton de recherche */}
          <button
            type="submit"
            disabled={isSearching}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isSearching
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            }`}
          >
            {isSearching ? "Recherche..." : "Rechercher les trains"}
          </button>
        </form>
      </div>

      {/* Résultats de recherche */}
      {showResults && (
        <div className="max-w-6xl mx-auto mt-8 px-4">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            Trains disponibles ({searchResults.length})
          </h3>
          
          {searchResults.length === 0 ? (
            <div className="bg-gradient-to-r from-blue-50 to-blue-500 dark:from-gray-900 dark:to-blue-900 rounded-lg shadow-md p-8 text-center">
              <FaTrain className="text-4xl text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Aucun train trouvé
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Aucun train disponible pour ce trajet à cette date.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {searchResults.map((train) => (
                <div
                  key={train.id}
                  className="bg-gradient-to-r from-blue-50 to-blue-500 dark:from-gray-900 dark:to-blue-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                        <FaTrain className="text-blue-600 dark:text-blue-400 text-xl" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {train.nom}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {train.duree} de voyage
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {train.prix[formData.classe]}FCFA
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Classe {formData.classe}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Départ</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formData.depart}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <FaClock className="text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Heure</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {train.heureDepart} - {train.heureArrivee}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-red-600" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Arrivée</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formData.destination}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t dark:border-gray-700">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Places disponibles: {train.capacite[formData.classe]}
                    </div>
                    <button
                    onClick={() => navigate('/paiements')}
                      className="px-6 py-2 rounded-lg font-medium transition duration-200 bg-blue-600 text-white hover:bg-blue-700"
                    >
                      payer
                    </button>
                    <button
                      onClick={() => handleReservation(train)}
                      disabled={isSubmitting || !selectedSeat}
                      className={`px-6 py-2 rounded-lg font-medium transition duration-200 ${
                        isSubmitting || !selectedSeat
                          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {isSubmitting ? "Réservation..." : "Réserver"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
