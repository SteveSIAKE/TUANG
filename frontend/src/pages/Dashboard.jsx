import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { reservationsService } from '../services/firestore';
import { FaTrain, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { currentUser, userProfile, logout } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      loadUserReservations();
    }
  }, [currentUser]);

  const loadUserReservations = async () => {
    try {
      const userReservations = await reservationsService.getUserReservations(currentUser.uid);
      setReservations(userReservations);
    } catch (error) {
      console.error('Erreur lors du chargement des réservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('fr-FR');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmée': return 'text-green-600 bg-green-100';
      case 'annulée': return 'text-red-600 bg-red-100';
      case 'en attente': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-500 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="backdrop-blur-lg shadow-md rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <FaUser className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Bonjour, {userProfile?.name || currentUser?.displayName || 'Utilisateur'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{currentUser?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
            >
              <FaSignOutAlt />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => navigate('/recherche')}
            className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 border border-gray-200 dark:border-gray-700 transition duration-200 text-center"
          >
            <FaTrain className="text-3xl mb-2 mx-auto" />
            <h3 className="text-lg font-semibold">Rechercher un train</h3>
            <p className="text-sm opacity-90">Trouvez votre prochain voyage</p>
          </button>
          
          <button
            onClick={() => navigate('/reservation')}
            className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 border border-gray-200 dark:border-gray-700 transition duration-200 text-center"
          >
            <FaCalendarAlt className="text-3xl mb-2 mx-auto" />
            <h3 className="text-lg font-semibold">Mes réservations</h3>
            <p className="text-sm opacity-90">Gérez vos billets</p>
          </button>
          
          <button
            onClick={() => navigate('/contact')}
            className="bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 border border-gray-200 dark:border-gray-700 transition duration-200 text-center"
          >
            <FaUser className="text-3xl mb-2 mx-auto" />
            <h3 className="text-lg font-semibold">Support</h3>
            <p className="text-sm opacity-90">Besoin d'aide ?</p>
          </button>
        </div>

        {/* Réservations récentes */}
        <div className="backdrop-blur-lg shadow-md rounded-lg borderbackdrop-blur-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Vos réservations récentes
          </h2>
          
          {reservations.length === 0 ? (
            <div className="text-center py-8">
              <FaTrain className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Vous n'avez pas encore de réservations
              </p>
              <div className='flex justify-center'>
              <button
                onClick={() => navigate('/recherche')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 border border-gray-200 dark:border-gray-700 transition duration-200"
              >
                Réserver votre premier billet
              </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {reservations.slice(0, 5).map((reservation) => (
                <div
                  key={reservation.id}
                  className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {reservation.trainNom || 'Train'}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                          {reservation.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-2">
                          <FaMapMarkerAlt className="text-blue-600" />
                          <span>{reservation.depart} → {reservation.destination}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <FaCalendarAlt className="text-green-600" />
                          <span>{formatDate(reservation.dateAller)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <FaClock className="text-purple-600" />
                          <span>{reservation.heureDepart || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {reservation.prix}€
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Classe {reservation.classe}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {reservations.length > 5 && (
                <div className="text-center pt-4">
                  <button
                    onClick={() => navigate('/reservation')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Voir toutes les réservations ({reservations.length})
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}