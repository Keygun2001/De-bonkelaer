import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC-VNUZlXR3WApcvywtNdy4hfZAs1wsaG4",
    authDomain: "tclievelde-9b69a.firebaseapp.com",
    databaseURL: "https://tclievelde-9b69a.firebaseio.com",
    projectId: "tclievelde-9b69a",
    storageBucket: "tclievelde-9b69a.appspot.com",
    messagingSenderId: "488726406053",
    appId: "1:488726406053:web:64df33b1aafdb51802be4c",
    measurementId: "G-GCBJVX5KTK"
  };
// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : ''

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export default firebase