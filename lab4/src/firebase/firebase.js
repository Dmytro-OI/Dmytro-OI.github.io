import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAevUsFkfyE4exgeGByhavZXR3cpZ-g8kY",
  authDomain: "project-8b7ac.firebaseapp.com",
  projectId: "project-8b7ac",
  storageBucket: "project-8b7ac.firebasestorage.app",
  messagingSenderId: "212646496214",
  appId: "1:212646496214:web:7f714686bc42c16090c677",
  measurementId: "G-0NS5HDFM5K"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const saveUserToFirestore = async (user, additionalData = {}) => {
  try {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || additionalData.name || null,
        age: additionalData.age || null,
        completedLessons: [],
        createdAt: new Date().toISOString(),
      });
      console.log("Користувача збережено в Firestore");
    } else {
      console.log("Користувач уже існує в Firestore");
    }
  } catch (error) {
    console.error("Помилка при збереженні користувача в Firestore:", error);
    throw error;
  }
};

export { auth, db };