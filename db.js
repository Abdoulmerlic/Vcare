import { db } from './firebase';
import { setDoc, doc } from "firebase/firestore";

const addUserToFirestore = async (userId, userData) => {
    try {
        await setDoc(doc(db, "users", userId), userData);
        console.log("User data added to Firestore");
    } catch (error) {
        console.error("Error adding user data:", error);
    }
}; 