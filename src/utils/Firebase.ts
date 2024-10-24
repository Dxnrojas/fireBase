// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKqbTsi0X32Fts9JO3C4TMcu2qGKVUZh0",
  authDomain: "lab-06-spoty.firebaseapp.com",
  projectId: "lab-06-spoty",
  storageBucket: "lab-06-spoty.appspot.com",
  messagingSenderId: "168434866059",
  appId: "1:168434866059:web:d2206bd51172087ef5818e",
  measurementId: "G-P669ZF3X1M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);