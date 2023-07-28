import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDJHwsnllt_TF0agWXSV9_Bofm7l0U9r-w",
  authDomain: "vartalapp-13a9f.firebaseapp.com",
  projectId: "vartalapp-13a9f",
  storageBucket: "vartalapp-13a9f.appspot.com",
  messagingSenderId: "327269219917",
  appId: "1:327269219917:web:fc4bd8199b554a5d5f6604",
  cors: {
    allowedOrigins: ["http://localhost:3000"]
  }
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();