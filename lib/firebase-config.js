import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For authentication
import { getFirestore } from "firebase/firestore"; // For Firestore database

const firebaseConfig = {
  apiKey: "AIzaSyDtwSIO2xzd9Yu0aBGR_-1kMDrYVA8Hny8",
  authDomain: "ypf-registration.firebaseapp.com",
  projectId: "ypf-registration",
  storageBucket: "ypf-registration.firebasestorage.app",
  messagingSenderId: "32050451598",
  appId: "1:32050451598:web:8148931a9653a701af25df",
  measurementId: "G-PWBN3H0TB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Authentication
const db = getFirestore(app); // Firestore database

export { app, auth, db }; // Export Firestore so you can use it in other files
