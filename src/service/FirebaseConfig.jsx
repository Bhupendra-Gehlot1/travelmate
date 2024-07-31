// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIcDiX8ypAqPGe0gwbiPUYC-ACEW3l3bw",
  authDomain: "qwiklabs-gcp-04-57a14237-2f2f3.firebaseapp.com",
  projectId: "qwiklabs-gcp-04-57a14237-2f2f3",
  storageBucket: "qwiklabs-gcp-04-57a14237-2f2f3.appspot.com",
  messagingSenderId: "10936571166",
  appId: "1:10936571166:web:178cda3cb5f0541172650f",
  measurementId: "G-N1L2XYFX0W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);