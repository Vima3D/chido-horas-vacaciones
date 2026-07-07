import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9a9EwVEgZVdKPGpM_s6OPqtMjDe97R8c",
  authDomain: "horas-trabajadores-e8c19.firebaseapp.com",
  projectId: "horas-trabajadores-e8c19",
  storageBucket: "horas-trabajadores-e8c19.firebasestorage.app",
  messagingSenderId: "769554312940",
  appId: "1:769554312940:web:bfc88476e828c7f89e7fc9",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
