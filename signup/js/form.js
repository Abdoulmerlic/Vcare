const firebaseConfig = {
    apiKey: "AIzaSyCbaudYLu38OTVWFCXPG4KrftD0F7itPtY",
    authDomain: "vcare-7fe11.firebaseapp.com",
    projectId: "vcare-7fe11",
    storageBucket: "vcare-7fe11.firebasestorage.app",
    messagingSenderId: "758260527245",
    appId: "1:758260527245:web:ab1cb441a86fa11e2a32c4",
    measurementId: "G-JEDSDJ4NT9"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Save form data to Firestore for Patient
async function savePatientData(step) {
    const form = document.getElementById(`${step}Form`);
    const data = new FormData(form);
    const formData = {};

    // Collect form data
    for (let [key, value] of data.entries()) {
        formData[key] = value;
    }

    // Save data locally to ensure persistence between steps
    for (const key in formData) {
        localStorage.setItem(key, formData[key]);
    }

    // After the final step, save all data to Firestore
    if (step === 'step5') {
        try {
            const email = localStorage.getItem('email');
            const password = localStorage.getItem('password');

            // Create Firebase Auth user
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Save user data to Firestore
            const patientData = { role: 'patient', ...Object.fromEntries(Object.entries(localStorage)) };
            await db.collection('users').doc(user.uid).set(patientData);

            // Clear localStorage after successful registration
            localStorage.clear();

            // Redirect to patient dashboard
            window.location.href = 'patient-dashboard/index.html';
        } catch (error) {
            console.error('Error during patient signup:', error);
            alert('Signup failed: ' + error.message);
        }
    }
}

// Load saved form data to persist across steps
function loadFormData() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (localStorage.getItem(input.name)) {
            input.value = localStorage.getItem(input.name);
        }
    });
}

// Navigate to the next step
function nextStep(nextPage, currentStep) {
    savePatientData(currentStep);
    window.location.href = nextPage;
}

// Navigate to the previous step
function prevStep(prevPage) {
    window.location.href = prevPage;
}

// Load data on page load
document.addEventListener('DOMContentLoaded', loadFormData);
