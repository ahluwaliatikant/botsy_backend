const express = require("express");
const asyncHandler = require('@joellesenne/express-async-handler')

exports.storeInDB = asyncHandler((req,res) => {
    const {sessionID , params} = req.body;

    console.log(sessionID);
    console.log(params);

    //TODO make function to upload to firebase
    
    res.status(200).json(params);
});