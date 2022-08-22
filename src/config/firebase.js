import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBmTi7hqx59B7F6JPXbEovHPzCdTEzHTw0",
  authDomain: "bengkelonline-bf821.firebaseapp.com",
  projectId: "bengkelonline-bf821",
  storageBucket: "bengkelonline-bf821.appspot.com",
  messagingSenderId: "352530139034",
  appId: "1:352530139034:web:8e6d7b67b7cb3610a69c23"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app);
