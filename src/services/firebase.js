// Import required Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBjrY0iI806yVGlx9VaUWjpoRJUqtgHWEY',
  authDomain: 'alpha-cf25d.firebaseapp.com',
  projectId: 'alpha-cf25d',
  storageBucket: 'alpha-cf25d.appspot.com',
  messagingSenderId: '676508521353',
  appId: '1:676508521353:web:42a91c6ee07a2a2b380758',
  measurementId: 'G-FDKZHBZF1K',
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export services for use
export { app, auth, db, storage };
