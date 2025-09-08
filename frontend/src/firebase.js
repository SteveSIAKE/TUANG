// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKFncDM_7SeekTLWp2CHXE0uCk8MgzOSw",
  authDomain: "tuang-48fb1.firebaseapp.com",
  projectId: "tuang-48fb1",
  storageBucket: "tuang-48fb1.firebasestorage.app",
  messagingSenderId: "358205105171",
  appId: "1:358205105171:web:2ed9677218d57b9a138be6",
  measurementId: "G-0FHT4MNLZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };