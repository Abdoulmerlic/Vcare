// authService.js

import { auth, db } from "./firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Sign up function with patient details
export async function signUp(email, password, patientData) {
  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save patient details in Firestore
    const patientsCollection = collection(db, "patients");
    await addDoc(patientsCollection, {
      userId: user.uid,
      name: patientData.name,
      age: patientData.age,
      phone: patientData.phone,
      address: patientData.address,
      bloodGroup: patientData.bloodGroup,
      email: email,
      createdAt: new Date(),
    });

    console.log("User signed up and patient details stored:", user.uid);
    return user;
  } catch (error) {
    console.error("Error during sign up:", error.message);
    throw error;
  }
}
