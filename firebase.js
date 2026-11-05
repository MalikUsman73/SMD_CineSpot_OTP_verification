import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDtl3xRT7uugaviTDXSG9ZUWxsy9nlnk3s',
  authDomain: 'cinespot-91f31.firebaseapp.com',
  projectId: 'cinespot-91f31',
  storageBucket: 'cinespot-91f31.firebasestorage.app',
  messagingSenderId: '239829728995',
  appId: '1:239829728995:web:8151bf219b3df300d10fd6',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
