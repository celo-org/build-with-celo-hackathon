import { initializeApp } from "firebase/app";
import { toaster } from "evergreen-ui";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrHttMmwGWmzOc4Oumxgk7Je9FcCMAFvg",
  authDomain: "climatefix-1a082.firebaseapp.com",
  projectId: "climatefix-1a082",
  storageBucket: "climatefix-1a082.appspot.com",
  messagingSenderId: "506093732620",
  appId: "1:506093732620:web:e083261e997545d870ff29",
  measurementId: "G-6DSXK5RY4Y",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (error) {
    console.error(error);
    toaster.danger(error.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toaster.danger(error.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password, location, typeUser) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password, location, typeUser);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      location,
      typeUser
    });
  } catch (error) {
    console.error(error);
    toaster.danger(error.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toaster.success("Password reset link sent!");
  } catch (error) {
    console.error(error);
    toaster.danger(error.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  registerWithEmailAndPassword,
  signInWithGoogle,
  logInWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
