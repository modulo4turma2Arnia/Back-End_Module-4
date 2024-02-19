import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDJTk66Xsjs0m--cDFMpXvX6EkA0FHeVnA",
  authDomain: "modulo4-4f6b2.firebaseapp.com",
  projectId: "modulo4-4f6b2",
  storageBucket: "modulo4-4f6b2.appspot.com",
  messagingSenderId: "239402188354",
  appId: "1:239402188354:web:e967c1e6cdb2d164beb7db",
  measurementId: "G-15X56YNV4S"
};

// Initialize Firebase
//  antes era app
export const appFireBase = initializeApp(firebaseConfig);
