// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBWlcwmf-H6dQsHlPvV1qbSl-OCHJBxouA",
  authDomain: "mobile-paiement.firebaseapp.com",
  projectId: "mobile-paiement",
  storageBucket: "mobile-paiement.appspot.com",
  messagingSenderId: "284229778540",
  appId: "1:284229778540:web:cdea6b25abcdc79f122c49",
  measurementId: "G-6THVCMKY4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export default app;