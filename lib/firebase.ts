import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCzfPgH8qTEV9LkPnQ_JKjAdhlRGFY8S9E",
  authDomain: "gymstore-c9171.firebaseapp.com",
  projectId: "gymstore-c9171",
  storageBucket: "gymstore-c9171.firebasestorage.app",
  messagingSenderId: "1021468402222",
  appId: "1:1021468402222:web:02b78b6b04688d5dc535bf",
  measurementId: "G-JZH8BYVK4J"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)