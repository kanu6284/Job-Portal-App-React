// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmfLduNrYNaf6_qapiALgh6674dz04S5I",
  authDomain: "job-portal-demo-ed7b0.firebaseapp.com",
  projectId: "job-portal-demo-ed7b0",
  storageBucket: "job-portal-demo-ed7b0.appspot.com",
  messagingSenderId: "744858130029",
  appId: "1:744858130029:web:376aea7cb59faf938dd164"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { app, auth };
