//import express from "express";
//import agentRoutes from "./routes/agent.js";
const express = require("express");
const {agentRoutes} = require("./routes/agent.js");
const {intentRoutes} = require("./routes/intent.js");
require('dotenv').config();
const bodyParser = require('body-parser');
const { webhookRoute } = require("./routes/webhook.js");
const { customIntentRoutes } = require("./routes/customBot.js");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/agents" , agentRoutes);
app.use("/api/intents" , intentRoutes);
app.use("/api/webhook/" , webhookRoute);
app.use("/api/intents/custom" , customIntentRoutes);

app.get("/test" , (req,res) => {
    res.status(200).json({"success" : "done"});
});

app.listen(PORT , () => {
    console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    console.log(`SERVER STARTED ON ${PORT}`);
});