// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPJbZb-SS_jFxyaP0TIbhmCyuz5d78wZQ",
  authDomain: "trible-bfeaf.firebaseapp.com",
  projectId: "trible-bfeaf",
  storageBucket: "trible-bfeaf.firebasestorage.app",
  messagingSenderId: "544256515378",
  appId: "1:544256515378:web:cdf4aecea93110103dcb2b",
  measurementId: "G-JEJV9VPVVS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
