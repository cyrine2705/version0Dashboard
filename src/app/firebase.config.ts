// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyACEgsdv0s6JiuqPd1HS9MbdUaGyiP6Trs",
  authDomain: "projet-pfe-3850d.firebaseapp.com",
  databaseURL: "https://projet-pfe-3850d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "projet-pfe-3850d",
  storageBucket: "projet-pfe-3850d.appspot.com",
  messagingSenderId: "363034307864",
  appId: "1:363034307864:web:1e1a37c93db15492c4026d",
  measurementId: "G-940MHKZ5G2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
