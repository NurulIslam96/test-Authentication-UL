// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByjN2vz3pHlvC4Ek86jJO7ubwjQfcJAK4",
  authDomain: "unio-labs-auth.firebaseapp.com",
  projectId: "unio-labs-auth",
  storageBucket: "unio-labs-auth.appspot.com",
  messagingSenderId: "860915863784",
  appId: "1:860915863784:web:a833fe55fc58909dd0f95d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);