// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNYFyKdIcuC2yR6dokj6HkrqWfnVfj4aI",
  authDomain: "journal-app-c6ba8.firebaseapp.com",
  projectId: "journal-app-c6ba8",
  storageBucket: "journal-app-c6ba8.appspot.com",
  messagingSenderId: "1066804692975",
  appId: "1:1066804692975:web:fa08999bfdb39b645a581a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
