import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// initialize firebase app with your config

const config = {
  apiKey: 'AIzaSyCV2dVWYH3cmkt_dOqnb1ErdSUPFR9ZgMA',
  authDomain: 'instagram-gh-4b28b.firebaseapp.com',
  databaseURL: 'https://instagram-gh-4b28b-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'instagram-gh-4b28b',
  storageBucket: 'instagram-gh-4b28b.appspot.com',
  messagingSenderId: '290928418739',
  appId: '1:290928418739:web:c5efcb88db925ccc6435c6'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
