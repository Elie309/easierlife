// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDVXGIN-ohPDWhgwcOj9qOJXpeNYseEfpU",
  authDomain: "easierlife-elie309.firebaseapp.com",
  projectId: "easierlife-elie309",
  storageBucket: "easierlife-elie309.appspot.com",
  messagingSenderId: "1029054175448",
  appId: "1:1029054175448:web:8b4f1ffe9e9ea795005fad",
  measurementId: "G-0SZ269R92Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fbAuth = getAuth(app);

(async () => {
  await setPersistence(fbAuth, browserLocalPersistence);
})();

export { fbAuth, app };