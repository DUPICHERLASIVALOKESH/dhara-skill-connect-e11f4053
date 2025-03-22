
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDOCAbC123dEf456GhI789jKl01-MnO",
  authDomain: "dhara-consultant.firebaseapp.com",
  projectId: "dhara-consultant",
  storageBucket: "dhara-consultant.appspot.com",
  messagingSenderId: "950275540099",
  appId: "1:950275540099:web:f0e9b5ec0a96a5bf82e903",
  measurementId: "G-DK9QD1F9Z7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Add custom parameters to the Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { app, auth, db, googleProvider };
