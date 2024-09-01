// src/firebase.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDFmW2UPN4Ml3183LvVCDewPsNCroQvhoQ",
    authDomain: "hostingtest-aadc2.firebaseapp.com",
    projectId: "hostingtest-aadc2",
    storageBucket: "hostingtest-aadc2.appspot.com",
    messagingSenderId: "269529898742",
    appId: "1:269529898742:web:4cdf9af94698c7b6ce56d7",
    measurementId: "G-11F1RQQW08"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;