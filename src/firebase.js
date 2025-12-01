import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCaocoKpTHDuC67VlbWAGXBie74J6GQHjs",
  authDomain: "tech-share-f3583.firebaseapp.com",
  projectId: "tech-share-f3583",
  storageBucket: "tech-share-f3583.firebasestorage.app",
  messagingSenderId: "497782998710",
  appId: "1:497782998710:web:33930b31086fe75a800817",
  measurementId: "G-VNLLZEPGN0"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };