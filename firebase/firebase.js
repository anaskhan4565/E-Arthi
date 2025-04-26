// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optiona
// l
import { isSupported } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAhZ2iMrp4pI5IbEwShflRb0waS5674baw",
  authDomain: "e-agri-fab88.firebaseapp.com",
  databaseURL: "https://e-agri-fab88-default-rtdb.firebaseio.com",
  projectId: "e-agri-fab88",
  storageBucket: "e-agri-fab88.firebasestorage.app",
  messagingSenderId: "749514666004",
  appId: "1:749514666004:web:d2f3276a4e952a9eaf7701",
  measurementId: "G-72J6CZ0NPV"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

// ✅ Only initialize analytics if supported (avoids the warning)
isSupported().then((supported) => {
  if (supported) {
    const analytics = getAnalytics(app);
  }
});