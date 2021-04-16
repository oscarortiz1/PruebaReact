import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/firebase-database"
import "firebase/firebase-storage"

const firebaseConfig = {
  apiKey: "AIzaSyBxCB-yfxhoX4nZTOoKDVHOI_psvUctXEg",
  authDomain: "pruebareact-d6037.firebaseapp.com",
  projectId: "pruebareact-d6037",
  storageBucket: "pruebareact-d6037.appspot.com",
  messagingSenderId: "664316555681",
  appId: "1:664316555681:web:e3be88f4e6f4fe00629be0",
  measurementId: "G-G81Q8HMD4S",
};


const fb = firebase.initializeApp(firebaseConfig);
export default fb;