const express = require("express");
const asyncHandler = require("@joellesenne/express-async-handler");
const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyD-HHz5P1nXHo4SOzeQKQw8j0UfqFzZalw",
  authDomain: "botsy-1c436.firebaseapp.com",
  projectId: "botsy-1c436",
  storageBucket: "botsy-1c436.appspot.com",
  messagingSenderId: "628923368078",
  appId: "1:628923368078:web:aab96c72501fe074313fdf",
  measurementId: "G-EPN51DR108",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

exports.storeInDB = asyncHandler((req, res) => {
  const { intentName, parameters, session } = req.body;

  console.log(intentName);
  console.log(parameters);
  console.log(session);

  const intentCollection = db.collection(intentName);
  intentCollection.add(parameters);

  //TODO make function to upload to firebase

  res.status(200).json(parameters);
});
