import * as firebase from "firebase";

require("firebase/firestore");
require("firebase/functions");

global.Image = function() {};

// Initialize Firebase
const firebaseConfig = {
  authDomain: "hcstasker-app.firebaseapp.com",
  databaseURL: "https://hcstasker-app.firebaseio.com",
  projectId: "hcstasker-app",
  storageBucket: "hcstasker-app.appspot.com",
  messagingSenderId: "20283485698",
  appId: "1:20283485698:web:bae6d87bae24a325"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const functions = firebase.functions();

export { firestore, functions };

export default firebase;
