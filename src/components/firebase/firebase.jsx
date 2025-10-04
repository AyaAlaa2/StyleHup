import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_A922j0xS1R7IOLb34kpW5UyWb0g0dNI",
  authDomain: "stylehup-project.firebaseapp.com",
  projectId: "stylehup-project",
  storageBucket: "stylehup-project.firebasestorage.app",
  messagingSenderId: "891533739195",
  appId: "1:891533739195:web:8fdcc8a7df9b3dbd13959e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
