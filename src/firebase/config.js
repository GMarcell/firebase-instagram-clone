// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDLiC65duYvkp2-DqQHqHREzn5kWb6lPR0",
    authDomain: "clone-instagram-6f601.firebaseapp.com",
    projectId: "clone-instagram-6f601",
    storageBucket: "clone-instagram-6f601.appspot.com",
    messagingSenderId: "784541952035",
    appId: "1:784541952035:web:9d604654765519dfb26996",
    measurementId: "G-2XGCN0KTXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const dbfirestore = getFirestore(app);

export const storage = getStorage(app)

