// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

//For Email/Password Sign In / Log In
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "task-prioritizer-c4bd1.firebaseapp.com",
  projectId: "task-prioritizer-c4bd1",
  storageBucket: "task-prioritizer-c4bd1.appspot.com",
  messagingSenderId: "454726634937",
  appId: "1:454726634937:web:114ff9c8e316e813f3ba68",
  signInFlow: 'popup',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

//Firebase Authentication
const auth = getAuth();
export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification };
