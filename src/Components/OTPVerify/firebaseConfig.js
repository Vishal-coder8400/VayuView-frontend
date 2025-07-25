// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJQbm5EXprUhbkSuSKVS2wGsITWg7GScI",
  authDomain: "vg-demo-b0827.firebaseapp.com",
  projectId: "vg-demo-b0827",
  storageBucket: "vg-demo-b0827.appspot.com",
  messagingSenderId: "1049304558439",
  appId: "1:1049304558439:web:95b7f234d129f8bcb45dc2",
  measurementId: "G-SPRN2NMJX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);