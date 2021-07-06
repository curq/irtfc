import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// initialize firebase app with your config

const config = process.env.FIREBASE_CONFIG;

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
