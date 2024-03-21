import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const firebaseConfig = {
  apiKey: "AIzaSyBv2vc1-RGh6-htKHNRW-Gs65OeEd5B99s",
  authDomain: "addd-b4230.firebaseapp.com",
  projectId: "addd-b4230",
  storageBucket: "addd-b4230.appspot.com",
  messagingSenderId: "104987385269",
  appId: "1:104987385269:web:d059ba44e65d90b72e4dfc",
  measurementId: "G-9S6J3EV77B"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, auth };