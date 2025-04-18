// src/firebase/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBRMUN-NGoQvDZddHpxZNZxcKoCyWqvHW4",
  authDomain: "my-edu-app-16447.firebaseapp.com",
  projectId: "my-edu-app-16447",
  storageBucket: "my-edu-app-16447.firebasestorage.app",
  messagingSenderId: "187979880834",
  appId: "1:187979880834:web:8d07bda5abca1ad28b979b",
  measurementId: "G-38JX4LYTGF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
