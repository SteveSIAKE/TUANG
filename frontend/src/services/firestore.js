import { collection, doc, addDoc, getDocs, getDoc, updateDoc, deleteDoc, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

// ===== TRAINS =====
export const trainsService = {
  // Ajouter un train
  async addTrain(trainData) {
    try {
      const docRef = await addDoc(collection(db, 'trains'), {
        ...trainData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Erreur lors de l\'ajout du train:', error);
      throw error;
    }
  },

  // Récupérer tous les trains
  async getAllTrains() {
    try {
      const querySnapshot = await getDocs(collection(db, 'trains'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des trains:', error);
      throw error;
    }
  },

  // Rechercher des trains
  async searchTrains(depart, destination, date) {
    try {
      const q = query(
        collection(db, 'trains'),
        where('depart', '==', depart),
        where('destination', '==', destination)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erreur lors de la recherche de trains:', error);
      throw error;
    }
  },

  // Récupérer un train par ID
  async getTrainById(trainId) {
    try {
      const docRef = doc(db, 'trains', trainId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération du train:', error);
      throw error;
    }
  }
};

// ===== RÉSERVATIONS =====
export const reservationsService = {
  // Créer une réservation
  async createReservation(reservationData) {
    try {
      const docRef = await addDoc(collection(db, 'reservations'), {
        ...reservationData,
        status: 'confirmée',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      throw error;
    }
  },

  // Récupérer les réservations d'un utilisateur
  async getUserReservations(userId) {
    try {
      const q = query(
        collection(db, 'reservations'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations:', error);
      throw error;
    }
  },

  // Mettre à jour une réservation
  async updateReservation(reservationId, updateData) {
    try {
      const docRef = doc(db, 'reservations', reservationId);
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la réservation:', error);
      throw error;
    }
  },

  // Annuler une réservation
  async cancelReservation(reservationId) {
    try {
      const docRef = doc(db, 'reservations', reservationId);
      await updateDoc(docRef, {
        status: 'annulée',
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Erreur lors de l\'annulation de la réservation:', error);
      throw error;
    }
  },

  // Supprimer une réservation
  async deleteReservation(reservationId) {
    try {
      await deleteDoc(doc(db, 'reservations', reservationId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la réservation:', error);
      throw error;
    }
  }
};

// ===== DONNÉES INITIALES =====
export const initializeData = {
  // Ajouter des trains d'exemple
  async addSampleTrains() {
    const sampleTrains = [
      {
        nom: "TGV 8501",depart: "Yaoundé",destination: "Obala",heureDepart: "08:30",heureArrivee: "10:30",duree: "2h00",prix: {
          economique: 45,
          premiere: 85,
          business: 120
        },
        capacite: {
          economique: 200,
          premiere: 50,
          business: 30
        },
        disponible: true
      },
      {
        nom: "TGV 8502",depart: "Ngaoundéré",destination: "Bassa",heureDepart: "14:15",heureArrivee: "16:15",duree: "2h00",
        prix: {
          economique: 45000,
          premiere: 85000,
          business: 120000
        },
        capacite: {
          economique: 200,
          premiere: 50,
          business: 30
        },
        disponible: true
      },
      {
        nom: "TGV 9201",depart: "Batchenga",destination: "Bessa",heureDepart: "07:00",heureArrivee: "10:20",duree: "3h20",
        prix: {
          economique: 65000,
          premiere: 125000,
          business: 180000
        },
        capacite: {economique: 250, premiere: 60,business: 40},disponible: true
      },
      {
        nom: "TER 4501",depart: "Belabo",destination: "Bessengué",heureDepart: "09:45",heureArrivee: "12:30",duree: "2h45",
        prix: {
          economique: 25000,
          premiere: 45000,
          business: 65000
        },
        capacite: {   
          economique: 150,
          premiere: 30,
          business: 20
        },
        disponible: true
      }
    ];

    try {
      for (const train of sampleTrains) {
        await trainsService.addTrain(train);
      }
      console.log('Trains d\'exemple ajoutés avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout des trains d\'exemple:', error);
    }
  }
};
