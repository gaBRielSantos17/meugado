
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPZfDNfz5IBd0QFIO_JGLafEoSkiIEC5c",
  authDomain: "meugado-8813b.firebaseapp.com",
  projectId: "meugado-8813b",
  storageBucket: "meugado-8813b.firebasestorage.app",
  messagingSenderId: "948727462548",
  appId: "1:948727462548:web:28a129fb51049a53c01281"
};
// Initialize Firebase
export const  FIREBASE_APP = initializeApp(firebaseConfig)
