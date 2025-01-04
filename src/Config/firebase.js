import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMABWO_MIeMLe4SOLbSnpJn76Szdj5ecM",
  authDomain: "drivedeal.firebaseapp.com",
  projectId: "drivedeal",
  storageBucket: "drivedeal.firebasestorage.app",
  messagingSenderId: "568145959874",
  appId: "1:568145959874:web:581f967d81db635ff1945b",
  measurementId: "G-8CJ1ZFY16T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);