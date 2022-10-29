import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCrHttMmwGWmzOc4Oumxgk7Je9FcCMAFvg",
  authDomain: "climatefix-1a082.firebaseapp.com",
  projectId: "climatefix-1a082",
  storageBucket: "climatefix-1a082.appspot.com",
  messagingSenderId: "506093732620",
  appId: "1:506093732620:web:e083261e997545d870ff29",
  measurementId: "G-6DSXK5RY4Y",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;