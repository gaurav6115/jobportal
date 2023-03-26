// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVqqMy35YVRXuVOw1F2bfNX4Na_wTFz04",
  authDomain: "jobportal-workplace.firebaseapp.com",
  projectId: "jobportal-workplace",
  storageBucket: "jobportal-workplace.appspot.com",
  messagingSenderId: "765824038550",
  appId: "1:765824038550:web:5a2cd0a21860e7097cb4b7",
  measurementId: "G-MLFWZF3SBF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

const analytics = getAnalytics(app);