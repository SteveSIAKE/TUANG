import { useState } from 'react';
import { initializeData } from '../services/firestore';
import { FaTrain, FaDatabase, FaCheck, FaSpinner } from 'react-icons/fa';

export default function InitData() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInitializeData = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await initializeData.addSampleTrains();
      setSuccess(true);
      console.log('Trains d\'exemple ajoutés avec succès dans Firestore !');
    } catch (err) {
      setError('Erreur lors de l\'ajout des trains : ' + err.message);
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-500 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 mx-auto mb-4">
            <FaDatabase className="text-blue-600 dark:text-blue-400 text-2xl mx-auto mt-2" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Initialiser les données de test
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Cliquez sur le bouton ci-dessous pour ajouter des trains d'exemple dans Firestore et tester l'application.
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center justify-center">
              <FaCheck className="mr-2" />
              Trains ajoutés avec succès !
            </div>
          )}

          <button
            onClick={handleInitializeData}
            disabled={loading || success}
            className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium transition duration-200 ${
              loading || success
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Ajout en cours...
              </>
            ) : success ? (
              <>
                <FaCheck className="mr-2" />
                Données ajoutées
              </>
            ) : (
              <>
                <FaTrain className="mr-2" />
                Ajouter les trains d'exemple
              </>
            )}
          </button>

          {success && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Prochaines étapes :
              </h3>
              <ul className="text-sm text-blue-700 dark:text-blue-300 text-left space-y-1">
                <li>• Allez sur la page "Rechercher un trajet"</li>
                <li>• Testez la recherche avec les gares disponibles</li>
                <li>• Créez une réservation</li>
                <li>• Vérifiez vos réservations dans le Dashboard</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
