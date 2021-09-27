import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAzhOD6FKlxR5qgVigJjqBMowcBf3ZRbE",
  authDomain: "cart-977a3.firebaseapp.com",
  projectId: "cart-977a3",
  storageBucket: "cart-977a3.appspot.com",
  messagingSenderId: "1072602613857",
  appId: "1:1072602613857:web:09d432a8becf87289a8220"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));
