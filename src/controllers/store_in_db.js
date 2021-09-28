const express = require("express");
const asyncHandler = require('@joellesenne/express-async-handler')
// const firebase = require("firebase");
const {initializeApp} = require("firebase/app");
const {getFirestore} = require("firebase/firestore/lite");

const firebaseConfig = {
  apiKey: "AIzaSyC4L4Hq0gOHWbzPfloqUmk3BivhI2s-bD4",
  authDomain: "testagent-gjkk.firebaseapp.com",
  projectId: "testagent-gjkk",
  storageBucket: "testagent-gjkk.appspot.com",
  messagingSenderId: "280386602838",
  appId: "1:280386602838:web:0ab0b044b6b135639d38f7",
  measurementId: "G-KF0WXL61TM"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

exports.storeInDB = asyncHandler(async(req,res) => {
    const {intentName , parameters , session} = req.body;

    console.log(intentName);
    console.log(parameters);
    console.log(session);
    //TODO make function to upload to firebase
    const intentsCol = collection(db, intentName);
    await intentCollection.add(parameters);
    
    res.status(200).json(parameters);
});