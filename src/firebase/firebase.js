import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  doc,
  getDocs,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDb07o_XesGtD4_oBH9-v3W4qByZDPI5V4",
  authDomain: "prodcomp-page.firebaseapp.com",
  projectId: "prodcomp-page",
  storageBucket: "prodcomp-page.appspot.com",
  messagingSenderId: "603300462654",
  appId: "1:603300462654:web:ffaf6ce16f68d4afd7516f",
  measurementId: "G-TR3KCV3TFE",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const filmRef = collection(db, "prodcomp-films");

export const getFilms = async () => {
  const snapshot = await getDocs(filmRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id, // Include the document ID
    ...doc.data(), // Spread the rest of the document data
  }));
};

export const firebaseLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { type: "success", user: userCredential.user };
  } catch (error) {
    return { type: "error", message: error.message };
  }
};

export const deleteFilm = async (filmId) => {
  const filmDocRef = doc(db, "prodcomp-films", filmId);
  await deleteDoc(filmDocRef);
};

// **Add a new film to the Firestore collection**
export const addFilm = async (filmData) => {
  try {
    const docRef = await addDoc(filmRef, filmData);
    return { id: docRef.id, ...filmData };
  } catch (error) {
    console.error("Error adding film: ", error);
    throw new Error("Failed to add film");
  }
};

// Custom hook for authentication
export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return user;
}

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out: ", error);
  }
};
