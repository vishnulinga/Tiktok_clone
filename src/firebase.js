// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBYpaXGS4m9Ne1zsBgObGtYIWDCu8tWwCo",
  authDomain: "tik-tok-clone-42969.firebaseapp.com",
  databaseURL: "https://tik-tok-clone-42969.firebaseio.com",
  projectId: "tik-tok-clone-42969",
  storageBucket: "tik-tok-clone-42969.appspot.com",
  messagingSenderId: "994197401941",
  appId: "1:994197401941:web:67b519a12930aae4c1bfdc",
  measurementId: "G-MVRT0G3Q3R"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();

export default db;