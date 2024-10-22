import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBEBiFflPklAlcpY6w1PvwxmbDMdZOmix4",
  authDomain: "new-todo-app-bb280.firebaseapp.com",
  projectId: "new-todo-app-bb280",
  storageBucket: "new-todo-app-bb280.appspot.com",
  messagingSenderId: "422653709557",
  appId: "1:422653709557:web:5d27ab951ff155a1bdc9bc",
  measurementId: "G-1D9ENRVDMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app)
const firestore = getFirestore(app);
const storage = getStorage(app);


export {analytics,auth,firestore,storage}