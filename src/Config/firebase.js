// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8G3SJ3rVlbCgPkePygyW08YahiOdnkDA",
    authDomain: "myfi-cbf74.firebaseapp.com",
    projectId: "myfi-cbf74",
    storageBucket: "myfi-cbf74.appspot.com",
    messagingSenderId: "1006343653715",
    appId: "1:1006343653715:web:7c770d49329e0a34f5f9a6",
    measurementId: "G-HKYX11SSCL"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();