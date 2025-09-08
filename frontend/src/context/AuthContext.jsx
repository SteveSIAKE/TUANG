import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  // Inscription avec profil utilisateur
  async function signup(email, password, userData) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Mettre à jour le profil Firebase Auth
    await updateProfile(user, {
      displayName: userData.name
    });

    // Créer le profil utilisateur dans Firestore
    await setDoc(doc(db, 'users', user.uid), {
uid: user.uid,
      email: email,
      name: userData.name,
      telephone: userData.telephone,
      createdAt: new Date(),
      role: 'user'
    });

    return userCredential;
  }

  // Connexion
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Déconnexion
  function logout() {
    return signOut(auth);
  }

  // Charger le profil utilisateur depuis Firestore
  async function loadUserProfile(uid) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUserProfile(userDoc.data());
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await loadUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {currentUser,userProfile,login,signup,logout,loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
