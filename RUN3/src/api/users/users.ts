import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'

import { db } from '../firebase-config'
import type { Step, User } from './users.interface'

const usersCollectionRef = collection(db, 'users')

export const getUsers = async () => {
  try {
    const data = await getDocs(usersCollectionRef)
    return data.docs.map((docData) => ({ id: docData.id, ...docData.data() }))
  } catch (e) {
    return e
  }
}

export const getUserById = async (id: string) => {
  try {
    const docRef = doc(db, 'users', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return { id, ...docSnap.data() }
    }
  } catch (e) {
    return e
  }
  return 'User not found'
}

export const createUser = async (user: User) => {
  try {
    const newUser = await addDoc(usersCollectionRef, user)
    const id = newUser.id
    const userData = await getUserById(id)
    return userData
  } catch (e) {
    return e
  }
}

export const updateUserInfo = async (id: string, user: User) => {
  try {
    const userDoc = doc(db, 'users', id)
    return await updateDoc(userDoc, {
      email: user.email,
      name: user.name,
      publicaddress: user.publicaddress,
    })
  } catch (e) {
    return e
  }
}

export const updateUserSteps = async (id: string, steps: Step[]) => {
  try {
    const userDoc = doc(db, 'users', id)
    return await updateDoc(userDoc, {
      steps,
    })
  } catch (e) {
    return e
  }
}

export const deleteUserById = async (id: string) => {
  try {
    const userDoc = doc(db, 'users', id)
    return await deleteDoc(userDoc)
  } catch (e) {
    return e
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    let result = {}
    const docRef = collection(db, 'users')
    const q = query(docRef, where('email', '==', email))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc1) => {
      if (doc1.exists()) {
        result = doc1.data()
      }
    })
    if (Object.keys(result).length === 0 && result.constructor === Object) {
      return 'User not found'
    }
    return result
  } catch (e) {
    return e
  }
}
