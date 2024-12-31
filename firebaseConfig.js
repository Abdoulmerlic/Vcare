import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCbaudYLu38OTVWFCXPG4KrftD0F7itPtY",
    authDomain: "vcare-7fe11.firebaseapp.com",
    projectId: "vcare-7fe11",
    storageBucket: "vcare-7fe11.firebasestorage.app",
    messagingSenderId: "758260527245",
    appId: "1:758260527245:web:ab1cb441a86fa11e2a32c4",
    measurementId: "G-JEDSDJ4NT9"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { auth };
