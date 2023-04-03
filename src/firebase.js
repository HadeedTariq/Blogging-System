// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX68uJEBAKO7QnhgawDLkklwk2yBkB7ss",
  authDomain: "blog-site-19a73.firebaseapp.com",
  projectId: "blog-site-19a73",
  storageBucket: "blog-site-19a73.appspot.com",
  messagingSenderId: "713160591903",
  appId: "1:713160591903:web:4776fddb1709657f57a32a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const provider=new GoogleAuthProvider()
export const db=getFirestore(app)
export const storage=getStorage(app)