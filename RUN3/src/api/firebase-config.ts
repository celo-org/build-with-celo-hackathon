// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBL8fhy662qz7SufetP9QWErsk2Is8FnW8',
  authDomain: 'run3-587b8.firebaseapp.com',
  projectId: 'run3-587b8',
  storageBucket: 'run3-587b8.appspot.com',
  messagingSenderId: '1094017794931',
  appId: '1:1094017794931:web:0ba3fad6265d574599fb06',
  measurementId: 'G-5WX6WK8RV9',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const storage = getStorage(app)
