// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyBeMucMNu175h-E2WcqfE3hAna0q73nBNc",
   authDomain: "visualcare-689e1.firebaseapp.com",
   projectId: "visualcare-689e1",
   storageBucket: "visualcare-689e1.firebasestorage.app",
   messagingSenderId: "474498396380",
   appId: "1:474498396380:web:5f3b157349e06f30264419",
   measurementId: "G-VSYDT6N9EW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Function to get available doctors
export async function getDoctors() {
    const doctorsCol = collection(db, "doctors");
    const doctorsSnapshot = await getDocs(doctorsCol);
    const doctorsList = doctorsSnapshot.docs.map(doc => doc.data());
    return doctorsList;
}

// Function to book an appointment
export async function bookAppointment(patientEmail, doctorName, timeSlot) {
    try {
        const docRef = await addDoc(collection(db, "appointments"), {
            patientEmail,
            doctorName,
            timeSlot,
            status: 'Pending',
        });
        console.log("Appointment booked with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
