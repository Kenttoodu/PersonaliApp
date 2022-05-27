// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQys9YArlNF8wwiRog3iOySqOUTqH8bJM",
  authDomain: "personnelauth.firebaseapp.com",
  projectId: "personnelauth",
  storageBucket: "personnelauth.appspot.com",
  messagingSenderId: "773945112652",
  appId: "1:773945112652:web:07010a8afa1dc293b5dce9"
};

function isLoggedIn(){
  return request.auth != null;
}

/**function hasAnyRole(roles) {
  return isLoggedIn() && get(/databases/$(database)/documents/roles/$(request.auth.uid)).data.roles.hasAny(roles)
}
**/

//Initialize authorization app
const app = initializeApp(firebaseConfig);

const createUserApp = initializeApp(firebaseConfig, "createNewUserApp");

export const auth = getAuth(app);

export const createUserAuth = getAuth(createUserApp);

export const roledb = getFirestore(app);

export const filedb = getStorage(app);


