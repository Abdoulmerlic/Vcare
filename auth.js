import { auth } from './supabase';
import { createUserWithEmailAndPassword } from "firebase/auth";

const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // User registered
        console.log("User registered:", userCredential.user);
    } catch (error) {
        console.error("Error registering user:", error);
    }
}; 