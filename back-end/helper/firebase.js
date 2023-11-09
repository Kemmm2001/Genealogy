// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD77EjhZ7MXYdjadAzY_imkmiSDFEAmw2s",
  authDomain: "capstone-834a4.firebaseapp.com",
  projectId: "capstone-834a4",
  storageBucket: "capstone-834a4.appspot.com",
  messagingSenderId: "575004506762",
  appId: "1:575004506762:web:1029df6db274669f084b73",
  measurementId: "G-B534KZT3SZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);