import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAoTBNXUj2iyjBvNhj67rod69drHpcKknw",
    authDomain: "kana-farm.firebaseapp.com",
    projectId: "kana-farm",
    storageBucket: "kana-farm.appspot.com",
    messagingSenderId: "749977735729",
    appId: "1:749977735729:web:d36db80303170915573b10"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {firebase, db, auth, storage}