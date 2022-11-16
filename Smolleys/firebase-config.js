import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDFDPLXz0IzK1G3JVg5fRZSNtGKos-sOYk",
  authDomain: "smolley-9b48c.firebaseapp.com",
  projectId: "smolley-9b48c",
  storageBucket: "smolley-9b48c.appspot.com",
  messagingSenderId: "1093592090082",
  appId: "1:1093592090082:web:50a3880748f87f483b65bb",
  measurementId: "G-PLM2DNPPYR",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
