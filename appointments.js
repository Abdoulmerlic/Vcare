import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const addAppointment = async (appointmentData) => {
    try {
        const docRef = await addDoc(collection(db, "appointments"), appointmentData);
        console.log("Appointment added with ID:", docRef.id);
    } catch (error) {
        console.error("Error adding appointment:", error);
    }
};

const getAppointments = async () => {
    const querySnapshot = await getDocs(collection(db, "appointments"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
}; 