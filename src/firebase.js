// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// const apikey = process.env.Api_Key;
// console.log(apikey);

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCj1AV2spQ2T8aGXpYbuigNyvoyZywzPKU",
  authDomain: "gappe-chatapp.firebaseapp.com",
  projectId: "gappe-chatapp",
  storageBucket: "gappe-chatapp.appspot.com",
  messagingSenderId: "593451544152",
  appId: "1:593451544152:web:d5e1af3e8b52592064e42d",
  measurementId: "G-MYC73C6X24",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

//apiKey: "AIzaSyCj1AV2spQ2T8aGXpYbuigNyvoyZywzPKU",
