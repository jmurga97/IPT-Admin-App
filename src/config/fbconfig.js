// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBFio3fVrx3kAKynhs83Uoi3YX-DvMk8ao",
  authDomain: "ipt-admin-app.firebaseapp.com",
  projectId: "ipt-admin-app",
  storageBucket: "ipt-admin-app.appspot.com",
  messagingSenderId: "45312329416",
  appId: "1:45312329416:web:2c418b13dda742587847fd",
  measurementId: "G-YPJ98GPKS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore()
const auth = getAuth()

enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });

export {
  analytics,
  db,
  auth
}