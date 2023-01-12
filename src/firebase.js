import firebase from "firebase";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwZ2MmZulIWqi8aWj-xmfJSuFFUvIgmZ4",
  authDomain: "linkedin2-64c86.firebaseapp.com",
  projectId: "linkedin2-64c86",
  storageBucket: "linkedin2-64c86.appspot.com",
  messagingSenderId: "299993811937",
  appId: "1:299993811937:web:ef75c6bf9b75e846a920a0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;