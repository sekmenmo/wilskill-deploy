// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-AiptXGOsG_viOxjyOhODPt9-siJaxdQ",
  authDomain: "wilskill-app.firebaseapp.com",
  projectId: "wilskill-app",
  storageBucket: "wilskill-app.appspot.com",
  messagingSenderId: "429039041982",
  appId: "1:429039041982:web:fafee7cd1db4b9b120cdef",
  measurementId: "G-JY1EJN8K2J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
