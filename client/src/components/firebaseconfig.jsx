
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDKj_dadCfkzoaQkKqC2KqH6L6d4IINR9Y",
  authDomain: "capstone-project-4381e.firebaseapp.com",
  projectId: "capstone-project-4381e",
  storageBucket: "capstone-project-4381e.appspot.com",
  messagingSenderId: "20762618259",
  appId: "1:20762618259:web:bb9999d78671f1e7a56066",
  measurementId: "G-E61H3HMKDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database =getAuth(app)