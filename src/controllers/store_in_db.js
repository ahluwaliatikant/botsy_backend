const express = require("express");
const asyncHandler = require("@joellesenne/express-async-handler");
const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyC4L4Hq0gOHWbzPfloqUmk3BivhI2s-bD4",
  authDomain: "testagent-gjkk.firebaseapp.com",
  projectId: "testagent-gjkk",
  storageBucket: "testagent-gjkk.appspot.com",
  messagingSenderId: "280386602838",
  appId: "1:280386602838:web:0ab0b044b6b135639d38f7",
  measurementId: "G-KF0WXL61TM"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

exports.storeInDB = asyncHandler(async (req, res) => {
  const { intentName, parameters, session } = req.body;

  console.log(intentName);
  console.log(parameters);
  console.log(session);

  const intentCollection = db.collection(intentName);
  await intentCollection.add(parameters);

  //TODO make function to upload to firebase

  res.status(200).json(parameters);
});
