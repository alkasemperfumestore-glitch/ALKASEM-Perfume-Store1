// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7zvOg0rRNWVZy5HyTHALi61iS_VNul0E",
  authDomain: "alkasem-perfume-store-6afd8.firebaseapp.com",
  projectId: "alkasem-perfume-store-6afd8",
  storageBucket: "alkasem-perfume-store-6afd8.firebasestorage.app",
  messagingSenderId: "152212953620",
  appId: "1:152212953620:web:2ddd11ce2dcc222242e501",
  measurementId: "G-GNEHFKNC11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);