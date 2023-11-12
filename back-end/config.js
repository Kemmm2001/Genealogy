const firebase = require('firebase')
const firebaseConfig = {
  apiKey: "AIzaSyA24h5DmIF7dEIXGPtvdMXT0r8h6D4_HkQ",
  authDomain: "token-2c4b0.firebaseapp.com",
  projectId: "token-2c4b0",
  storageBucket: "token-2c4b0.appspot.com",
  messagingSenderId: "529962852280",
  appId: "1:529962852280:web:2c1d196f4b8603b0e3794d",
  measurementId: "G-H62VPY8WJD"
};
firebase.initializeAoo(firebaseConfig)
const db = firebase.firestore()
const Token = db.collection("Token")

module.exports = Token
