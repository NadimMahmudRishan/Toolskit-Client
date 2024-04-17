// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLN_YaOKRApzwZNZVAtZ0JPy09CDYF-LA",
  authDomain: "toolskit-org.firebaseapp.com",
  projectId: "toolskit-org",
  storageBucket: "toolskit-org.appspot.com",
  messagingSenderId: "233063561856",
  appId: "1:233063561856:web:54dd78279f4c9063e98465"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;