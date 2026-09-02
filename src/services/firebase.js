
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCUStRB-XBvI2GvvodG52DTgMBv3b-D80s",
  authDomain: "insta-clone-build-67ccb.firebaseapp.com",
  projectId: "insta-clone-build-67ccb",
  storageBucket: "insta-clone-build-67ccb.firebasestorage.app",
  messagingSenderId: "679596032000",
  appId: "1:679596032000:web:1d300540ed8877664cd8e5"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);