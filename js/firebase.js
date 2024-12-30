  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
 
  []
  const firebaseConfig = {
    apiKey: "AIzaSyCRfuv22j6h7y5D4KCUQ4U5FhdGySbg5bo",
    authDomain: "vcare-2c86a.firebaseapp.com",
    projectId: "vcare-2c86a",
    storageBucket: "vcare-2c86a.firebasestorage.app",
    messagingSenderId: "708694303354",
    appId: "1:708694303354:web:2c1ea1c872bd5846f8d1c3",
    measurementId: "G-H8NZ5DW7HG"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  