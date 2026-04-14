import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getFirestore, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDqKNsxtt6_G6xTLwM2DKRd1C37mpUhbkU',
  authDomain: 'netflix-clone-e7442.firebaseapp.com',
  projectId: 'netflix-clone-e7442',
  storageBucket: 'netflix-clone-e7442.firebasestorage.app',
  messagingSenderId: '522184280170',
  appId: '1:522184280170:web:070f8e595d3da7d266a213',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  await setDoc(doc(db, 'users', user.uid), {
    name,
    email,
    authProvider: 'local',
  })

  return user
}

const signIn = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

const logout = async () => {
  await signOut(auth)
}

export { auth, signup, signIn, logout }
