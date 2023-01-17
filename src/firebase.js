import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

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
const firebaseApp = firebase.initializeApp( firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
export { db, auth, provider, storage, firebaseApp };

