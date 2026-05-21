/* ===================================================
   EQUIPO MATERO — firebase-config.js
   =================================================== */

const firebaseConfig = {
  apiKey:            "AIzaSyA9Y59dLkjBwtkj5_zsv5Ndfe5x1Vt62ns",
  authDomain:        "equipomatero-633c0.firebaseapp.com",
  projectId:         "equipomatero-633c0",
  storageBucket:     "equipomatero-633c0.firebasestorage.app",
  messagingSenderId: "863780680384",
  appId:             "1:863780680384:web:4bdeeaed7cd23b2ff0f325"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
