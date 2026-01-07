import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCgSnNWCxLN9yfAi4EirmFVmqRSnSZXtvM",
  authDomain: "foodrescue-64f70.firebaseapp.com",
  projectId: "foodrescue-64f70",
  storageBucket: "foodrescue-64f70.firebasestorage.app",
  messagingSenderId: "415780168826",
  appId: "1:415780168826:web:a61103523ca8b1c71e07c3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
