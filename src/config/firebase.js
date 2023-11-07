import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDH6nPD4UxTE_ZaBbYJ1x5f31W89Lomic",
  authDomain: "projeto-beyond-8c339.firebaseapp.com",
  projectId: "projeto-beyond-8c339",
  storageBucket: "projeto-beyond-8c339.appspot.com",
  messagingSenderId: "974103664843",
  appId: "1:974103664843:web:8d78c226e08a3bf74b234e",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { firebaseApp, auth, googleProvider, githubProvider, db };
