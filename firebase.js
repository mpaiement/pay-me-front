import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWlcwmf-H6dQsHlPvV1qbSl-OCHJBxouA",
  authDomain: "mobile-paiement.firebaseapp.com",
  projectId: "mobile-paiement",
  storageBucket: "mobile-paiement.appspot.com",
  messagingSenderId: "284229778540",
  appId: "1:284229778540:web:cdea6b25abcdc79f122c49",
  measurementId: "G-6THVCMKY4Q"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Utilisation de `initializeAuth` seulement pour React Native
let auth;
if (typeof window === 'undefined') {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
} else {
  auth = getAuth(app);
}

export { auth };
export default app;