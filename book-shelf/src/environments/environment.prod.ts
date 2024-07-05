// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAo8gDkfAyYwvEAah9p_A2Hyb7bd2saF7E",
  authDomain: "book-shelf-361ec.firebaseapp.com",
  projectId: "book-shelf-361ec",
  storageBucket: "book-shelf-361ec.appspot.com",
  messagingSenderId: "744788570386",
  appId: "1:744788570386:web:2d3acccd41f56f4449c3cb",
  measurementId: "G-5CNPDG4MBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
