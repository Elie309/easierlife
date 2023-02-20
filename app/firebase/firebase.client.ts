// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, inMemoryPersistence, setPersistence } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSENGER_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyDVXGIN-ohPDWhgwcOj9qOJXpeNYseEfpU",
  authDomain: "easierlife-elie309.firebaseapp.com",
  databaseURL: "https://easierlife-elie309-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "easierlife-elie309",
  storageBucket: "easierlife-elie309.appspot.com",
  messagingSenderId: "1029054175448",
  appId: "1:1029054175448:web:8b4f1ffe9e9ea795005fad",
  measurementId: "G-0SZ269R92Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Let Remix handle the persistence via session cookies.
setPersistence(auth, inMemoryPersistence);

export { auth as clientAuth };
