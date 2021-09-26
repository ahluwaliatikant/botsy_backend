
//import asyncHandler from "express-async-handler";
const express = require("express");
const asyncHandler = require('@joellesenne/express-async-handler')


//'use strict';

// export const createAgent = async function create_agent(projectID='YOUR_PROJECT_ID', displayName='defaultAgentDisplayName') {
//     const {AgentsClient} = require('@google-cloud/dialogflow');
//     const agentsClient = new AgentsClient();
//     const agentPath = agentsClient.projectPath(projectID);

//     const agent = {
//         parent: agentPath,
//         displayName: displayName,
//         defaultLanguageCode: 'en',
//         timeZone: 'Asia/Colombo'
//     };

//     async function set_agent() {
//         const request = {
//             agent
//         };

//         try {
//             const [response] = await agentsClient.setAgent(request);
//             console.log(`Agent ${displayName} created`);
//             return 200;                
//         } catch (error) {
//             console.log(error)
//             return 500;
//         }
//     }
    
//     return await set_agent();
// }



exports.myCreateAgent = asyncHandler( async (req, res) => {
    const {name , projectID} = req.body;

    console.log("AGENT NAME - ");
    console.log(name);
    console.log("PROJECT ID");
    console.log(projectID);

    const {AgentsClient} = require('@google-cloud/dialogflow');
    const agentsClient = new AgentsClient();
    const agentPath = agentsClient.projectPath(projectID);

    const agent = {
        parent: agentPath,
        displayName: name,
        defaultLanguageCode: 'en',
        timeZone: 'Asia/Kolkata'
    };

    async function set_agent() {
        const request = {
            agent
        };

        try {
            const [response] = await agentsClient.setAgent(request);
            console.log(`Agent ${name} created`);
            return response;                
        } catch (error) {
            console.log(error)
            return {"error": "ERROR IN SET AGENT"};
        }
    }
    try{
        const agent = await set_agent();
        return res.status(200).json(agent);
    }
    catch(e){
        console.log(e);
        res.status(500).json({"error": "failed"});
        throw new Error("Could not create agent");
    }

});
