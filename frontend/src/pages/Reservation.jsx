import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { reservationsService } from '../services/firestore';
import { FaTrain, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaEdit, FaTrash, FaDownload, FaFilter } from 'react-icons/fa';

export default function Reservation() {
  const { currentUser } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    if (currentUser) {
      loadUserReservations();
    }
  }, [currentUser]);

  useEffect(() => {
    filterAndSortReservations();
  }, [reservations, filter, sortBy]);

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

  const filterAndSortReservations = () => {
    let filtered = [...reservations];

    // Filtrer par statut
    if (filter !== 'all') {
      filtered = filtered.filter(reservation => reservation.status === filter);
    }

    // Trier
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          const dateA = a.dateAller?.toDate ? a.dateAller.toDate() : new Date(a.dateAller);
          const dateB = b.dateAller?.toDate ? b.dateAller.toDate() : new Date(b.dateAller);
          return dateB - dateA;
        case 'prix':
          return b.prix - a.prix;
        case 'destination':
          return a.destination.localeCompare(b.destination);
        default:
          return 0;
      }
    });

    setFilteredReservations(filtered);
  };

  const handleCancelReservation = async (reservationId) => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      try {
        await reservationsService.cancelReservation(reservationId);
        await loadUserReservations();
      } catch (error) {
        console.error('Erreur lors de l\'annulation:', error);
        alert('Erreur lors de l\'annulation de la réservation');
      }
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer définitivement cette réservation ?')) {
      try {
        await reservationsService.deleteReservation(reservationId);
        await loadUserReservations();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de la réservation');
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('fr-FR');
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('fr-FR');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmée': return 'text-green-600 bg-green-100 border-green-200';
      case 'annulée': return 'text-red-600 bg-red-100 border-red-200';
      case 'en attente': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Chargement de vos réservations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-500 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 p-6 border rounded-lg shadow-md">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Mes Réservations
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez toutes vos réservations de billets de train
          </p>
        </div>

        {/* Filtres et tri */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <FaFilter className="text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">Toutes les réservations</option>
                <option value="confirmée">Confirmées</option>
                <option value="en attente">En attente</option>
                <option value="annulée">Annulées</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">Trier par:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="date">Date de voyage</option>
                <option value="prix">Prix</option>
                <option value="destination">Destination</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {filteredReservations.length} réservation(s) trouvée(s)
          </div>
        </div>

        {/* Liste des réservations */}
        {filteredReservations.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <FaTrain className="text-4xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Aucune réservation trouvée
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {filter === 'all' 
                ? "Vous n'avez pas encore de réservations" 
                : `Aucune réservation avec le statut "${filter}"`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                      <FaTrain className="text-blue-600 dark:text-blue-400 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {reservation.trainNom || 'Train'}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Réservation #{reservation.id.slice(-8)}
                      </p>
                    </div>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(reservation.status)}`}>
                    {reservation.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Trajet</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {reservation.depart} → {reservation.destination}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Date de départ</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatDate(reservation.dateAller)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaClock className="text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Heure</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {reservation.heureDepart || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Prix total</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {reservation.prix}€
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Classe {reservation.classe}
                    </p>
                  </div>
                </div>

                {reservation.dateRetour && (
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Voyage retour</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatDate(reservation.dateRetour)} - {reservation.heureRetour || 'N/A'}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Réservé le {formatDateTime(reservation.createdAt)}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-200"
                      title="Télécharger le billet"
                    >
                      <FaDownload className="text-sm" />
                      <span className="text-sm">Billet</span>
                    </button>

                    {reservation.status === 'confirmée' && (
                      <button
                        onClick={() => handleCancelReservation(reservation.id)}
                        className="flex items-center space-x-1 bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition duration-200"
                        title="Annuler la réservation"
                      >
                        <FaEdit className="text-sm" />
                        <span className="text-sm">Annuler</span>
                      </button>
                    )}

                    {reservation.status === 'annulée' && (
                      <button
                        onClick={() => handleDeleteReservation(reservation.id)}
                        className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-200"
                        title="Supprimer définitivement"
                      >
                        <FaTrash className="text-sm" />
                        <span className="text-sm">Supprimer</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
