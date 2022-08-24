import firebase from "@react-native-firebase/app";
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBmTi7hqx59B7F6JPXbEovHPzCdTEzHTw0",
  authDomain: "bengkelonline-bf821.firebaseapp.com",
  projectId: "bengkelonline-bf821",
  storageBucket: "bengkelonline-bf821.appspot.com",
  messagingSenderId: "352530139034",
  appId: "1:352530139034:web:8e6d7b67b7cb3610a69c23"
};

export const app = firebase.initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
// export const db = firestore (app);
