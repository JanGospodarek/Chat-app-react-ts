import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { API_KEY } from "./config";
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "chat2-e76f3.firebaseapp.com",
  projectId: "chat2-e76f3",
  storageBucket: "chat2-e76f3.appspot.com",
  messagingSenderId: "209345409809",
  appId: "1:209345409809:web:92567dd65b891c933292b0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
