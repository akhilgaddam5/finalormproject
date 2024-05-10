// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCap9wVi-rX8zwHQnvsqgaEeQYY6qFaYi8",
  authDomain: "ormapp-b2ac8.firebaseapp.com",
  projectId: "ormapp-b2ac8",
  storageBucket: "ormapp-b2ac8.appspot.com",
  messagingSenderId: "781078535789",
  appId: "1:781078535789:web:b168880b9292ff10312964"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
