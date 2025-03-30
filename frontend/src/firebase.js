import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA9ZKWN2DB9hmx8o8giDXF8w2t_wiHs6P0",
    authDomain: "comini-52e67.firebaseapp.com",
    projectId: "comini-52e67",
    storageBucket: "comini-52e67.firebasestorage.app",
    messagingSenderId: "970111381677",
    appId: "1:970111381677:web:4d33d317543424cdb59624",
    measurementId: "G-LDHNQHRYEF"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, db, provider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, doc, setDoc, getDoc };