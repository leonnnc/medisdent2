// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB03qmNbukaN0PpyneyRdEe0fS1PfbVLCQ",
  authDomain: "medisdent2.firebaseapp.com",
  projectId: "medisdent2",
  storageBucket: "medisdent2.firebasestorage.app",
  messagingSenderId: "162921135868",
  appId: "1:162921135868:web:d482edbff28ea925e96179"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

console.log("Firebase initialized successfully");
