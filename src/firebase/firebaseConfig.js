// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbpHqvWpi2dY7_7Im8_axels2-BvxLTFY",
  authDomain: "fir-d3809.firebaseapp.com",
  databaseURL: "https://fir-d3809-default-rtdb.firebaseio.com",
  projectId: "fir-d3809",
  storageBucket: "fir-d3809.appspot.com",
  messagingSenderId: "963338611697",
  appId: "1:963338611697:web:43e791729efa7becb7b250"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);
export const storage = getStorage(app);