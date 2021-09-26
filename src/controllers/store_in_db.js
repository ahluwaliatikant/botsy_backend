const express = require("express");
const asyncHandler = require('@joellesenne/express-async-handler')

exports.storeInDB = asyncHandler((req,res) => {
    const {intentName , parameters , session} = req.body;

    console.log(intentName);
    console.log(parameters);
    console.log(session);

    //TODO make function to upload to firebase
    
    res.status(200).json(parameters);
});