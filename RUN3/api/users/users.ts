import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

import { db } from '../firebase-config';
import type { Step, User } from './users.interface';

const usersCollectionRef = collection(db, 'users');

export const getUsers = async () => {
  try {
    const data = await getDocs(usersCollectionRef);
    return data.docs.map((docData) => ({ id: docData.id, ...docData.data() }));
  } catch (e) {
    return e;
  }
};

export const getUserById = async (id: string) => {
  try {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id, ...docSnap.data() };
    }
  } catch (e) {
    return e;
  }
  return 'User not found';
};

export const createUser = async (user: User) => {
  try {
    return await addDoc(usersCollectionRef, user);
  } catch (e) {
    return e;
  }
};

export const updateUserInfo = async (id: string, user: User) => {
  try {
    const userDoc = doc(db, 'users', id);
    return await updateDoc(userDoc, {
      email: user.email,
      name: user.name,
      publicaddress: user.publicaddress,
    });
  } catch (e) {
    return e;
  }
};

export const updateUserSteps = async (id: string, steps: Step[]) => {
  try {
    const userDoc = doc(db, 'users', id);
    return await updateDoc(userDoc, {
      steps,
    });
  } catch (e) {
    return e;
  }
};

export const deleteUserById = async (id: string) => {
  try {
    const userDoc = doc(db, 'users', id);
    return await deleteDoc(userDoc);
  } catch (e) {
    return e;
  }
};
