//'use strict';

function create_training_phrase(parts) {
    return {
        type: 'EXAMPLE',
        parts: parts,
    };
}


function create_parameter(
    displayName,
    value,
    entityTypeDisplayName,
    mandatory=false,
    prompts=[]
    ) {
        return {
            prompts: prompts,
            displayName: displayName,
            value: value,
            entityTypeDisplayName: entityTypeDisplayName,
            mandatory: mandatory
        }
    }



const asyncHandler = require("@joellesenne/express-async-handler");
const { exception } = require("console");
const { isNull, isUndefined } = require("lodash");
const { type } = require("os");

function create_part(
    text='default text',
    entity_type=null,
    alias=null,
    is_annotated=false
) {
    var part = {};
    if (is_annotated) {
        if (isNull(entity_type) || isNull(alias)) {
            throw exception;
        }
        part = {
            text: text,
            entityType: entity_type,
            alias: alias,
            userDefined: true
        };
    }
    else {
        part = {
            text: text,
        };
    }
    console.log(part);
    return part;
}

function create_intent(
    projectId = 'YOUR_PROJECT_ID',
    displayName = 'defaultIntentDisplayName',
    trainingPhrasesParts = [],
    parameters=[],
    messageTexts = []
) {

    // Imports the Dialogflow library
    const dialogflow = require('@google-cloud/dialogflow');

    // Instantiates the Intent Client
    const intentsClient = new dialogflow.IntentsClient();
    
    // if (isUndefined(intView)) {
    //     console.log('nooooo')
    //     return
    // }
    // const agentsPath = intentsClient.projectAgentPath(projectId);

    // const req = {
    //     parent: agentsPath,
    //     intentView: 'INTENT_VIEW_FULL'
    // }
    // async function abc () {
    //     var resp = await intentsClient.listIntents(req)
    //     console.log('why' + JSON.stringify(resp));
    
    // }
    // abc();
    // return;

    // The path to identify the agent that owns the created intent.
    const agentPath = intentsClient.projectAgentPath(projectId);

    var trainingPhrases = []
    // trainingPhrasesParts = ['Whats your name', 'What do people call you?' ]
    trainingPhrasesParts.forEach(trainingPhrasesPart => {
        trainingPhrases.push(create_training_phrase(trainingPhrasesPart));
    })

    var messages = [{
        text: {
            text: messageTexts
        }
    }]
    
    async function create_intent_request() {

        console.log('TRAINING PHRASES: ' + JSON.stringify(trainingPhrases));

        const intent = {
            displayName: displayName,
            parameters: parameters,
            trainingPhrases: trainingPhrases,
            messages: messages,
            webhookState: "WEBHOOK_STATE_ENABLED",
        }
        // var temp_req = {"inputContextNames":[],"events":[],"trainingPhrases":[{"parts":[{"text":"My Name is ","entityType":"","alias":"","userDefined":false},{"text":"John","entityType":"@sys.given-name","alias":"first-name","userDefined":true},{"text":" ","entityType":"","alias":"","userDefined":false},{"text":"Willow","entityType":"@sys.last-name","alias":"family-name","userDefined":true}],"type":"EXAMPLE","timesAddedCount":0}],"outputContexts":[],"parameters":[{"prompts":[],"displayName":"first-name","value":"$first-name","defaultValue":"","entityTypeDisplayName":"@sys.given-name","mandatory":false,"isList":false},{"prompts":[],"displayName":"family-name","value":"$family-name","defaultValue":"","entityTypeDisplayName":"@sys.last-name","mandatory":true,"isList":false}],"messages":[{"platform":"PLATFORM_UNSPECIFIED","text":{"text":["Hey $first-name $family-name","Good to hear from $first-name $family-name"]},"message":"text"}],"defaultResponsePlatforms":[],"followupIntentInfo":[],"displayName":"myNewTestIntentv3","priority":500000,"isFallback":false,"webhookState":"WEBHOOK_STATE_UNSPECIFIED","action":"","resetContexts":false,"rootFollowupIntentName":"","parentFollowupIntentName":"","mlDisabled":false,"liveAgentHandoff":false,"endInteraction":false}
        const createIntentRequest = {
            parent: agentPath,
            intent: intent,
            intentView: 'INTENT_VIEW_FULL'
        };
      
        // Create the intent
        const [response] = await intentsClient.createIntent(createIntentRequest);
        console.log('yayay');
        console.log(`${JSON.stringify(response)}`)
        console.log(`Intent ${response.name} created`); 
        
        
        // const [response2] = await intentsClient.updateIntent(createIntentRequest);
        // console.log(`${JSON.stringify(response2)}`)
        // console.log(`Intent ${response2.name} updated`); 
    }

    create_intent_request();
}


// var part1 = create_part('My Name is ')
// var part2 = create_part('@first-name', '@sys.given-name', 'first-name', true)
// var part3 = create_part(' ')
// var part4 = create_part('@family-name', '@sys.last-name', 'family-name', true)

// var param_last_name = create_parameter('family-name','$family-name', '@sys.last-name')
// var param_first_name = create_parameter('first-name','$first-name', '@sys.given-name')

// var trainingPhrasePart = [part1, part2, part3, part4]
// var trainingPhrasesParts = [trainingPhrasePart]

var messageTexts = ['Hey $first-name $family-name', 'Good to hear from $first-name $family-name']

function getNameProps(){

    var part1 = create_part('My Name is ')
    var part2 = create_part('@first-name', '@sys.given-name', 'first-name', true)
    //var part2 = create_part('Harry', '@sys.given-name', 'first-name', true)
    var part3 = create_part(' ')
    var part4 = create_part('@family-name', '@sys.last-name', 'family-name', true)
    //var part4 = create_part('Kane', '@sys.last-name', 'family-name', true)

    var param_last_name = create_parameter('family-name','$family-name', '@sys.last-name' , true , ["Please Enter Last Name."]);
    var param_first_name = create_parameter('first-name','$first-name', '@sys.given-name', true , ["Please Enter First Name."]);

    var trainingPhrasePart = [part1, part2, part3, part4]
    var trainingPhrasesParts = [trainingPhrasePart]

    var messageTexts = ['Hey $first-name $family-name', 'Good to hear from $first-name $family-name']

    return {
        "trainingPhrasesParts": trainingPhrasesParts,
        "messageTexts": messageTexts,
        "params": [param_first_name,param_last_name],
    };
}

function getCreditCardProps(){
    const part1 = create_part('Apply for Credit Card for ');
    const part2 = create_part('@first-name', '@sys.given-name', 'first-name', true);
    const part3 = create_part(' ');
    const part4 = create_part('@family-name', '@sys.last-name', 'family-name', true);
    const part5 = create_part('born on ');
    const part6 = create_part('@date-of-birth' , '@sys.date' , 'date-of-birth' , true);
    const part7 = create_part(' ');
    const part8 = create_part('with aadhar number ');
    const part9 = create_part('@aadhar-number' , '@sys.number' , 'aadhar-number' , true);
    const part10 = create_part(' ');
    const part11 = create_part('and phone number ');
    const part12 = create_part('@phone' , "@sys.phone-number" , 'phone' , true);

    var param_last_name = create_parameter('family-name','$family-name', '@sys.last-name' , true , ["Please Enter Last Name."]);
    var param_first_name = create_parameter('first-name','$first-name', '@sys.given-name', true , ["Please Enter First Name."]);
    var param_dob = create_parameter('date-of-birth' , '$date-of-birth' , '@sys.date' , true , ["Please Enter your Date of Birth."]);
    var param_aadhar = create_parameter('aadhar-number' , '$aadhar-number' , '@sys.number' , true , ["Please Enter your Aadhar Number."]);
    var param_phone = create_parameter('phone' , '$phone' , '@sys.phone-number' , true , ['Please enter your Mobile Number']);

    var paramList = [param_first_name , param_last_name , param_dob , param_aadhar , param_phone];
 
    var trainingPhrasePart = [part1, part2, part3, part4, part5 , part6, part7, part8, part9, part10, part11, part12];
    var trainingPhrasesParts = [trainingPhrasePart]

    var messageTexts = ['Thank you for trusting us. Credit Card application for $first-name $last-name with AADHAAR NUMBER- $aadhar-number , DOB- $date-of-birth and PHONE NUMBER- $phone is successfully completed !'];

    return {
        "trainingPhrasesParts": trainingPhrasesParts,
        "messageTexts": messageTexts,
        "params": paramList,
    };

}


exports.createIntent = asyncHandler((req,res) => {

    const {name , projectID, type} = req.body;

    var props = getNameProps();

    create_intent(
        projectID,
        name,
        props["trainingPhrasesParts"],
        props["params"],
        props["messageTexts"]
    )
});

function myTypeToEntity( myDataType ){

    console.log("MY DATA TYPE -" + myDataType);

    const dataTypeToEntity = new Map();
    dataTypeToEntity.set("Long Number" , "@sys.number");
    dataTypeToEntity.set("Integer" , "@sys.integer");
    dataTypeToEntity.set("Date" , "@sys.date");
    dataTypeToEntity.set( "Phone Number"  , "@sys.phone-number");
    dataTypeToEntity.set("First Name" , "@sys.given-name");
    dataTypeToEntity.set("Last Name" ,  "@sys.last-name");
    dataTypeToEntity.set("URL" , "@sys.url");

    console.log(dataTypeToEntity.get(myDataType));
    return dataTypeToEntity.get(myDataType);

}

function cleanString(str) {
    return str.replace(/ /g, '-').toLowerCase();
}

function getCustomBotProps(name , fields){
    var part1 = create_part(name);
    var partSpace = create_part(' ');
    var partsList = [part1 , partSpace];
    var paramsList = [];
    var messageText = "Thank you for using this chatbot for " + name + ". All the fields entered: ";


    fields.forEach((element) => {
        console.log(element);
        console.log(element["name"]);
        var partName = element["name"];
        var partNameWithHyphens = cleanString(partName);
        var partType = myTypeToEntity(element["type"]);
        console.log(partType);
        var part = create_part('@' + partNameWithHyphens, partType, partNameWithHyphens, true);
        console.log("PART CREATED");
        var part2 = create_part(' ');
        var param_for_part = create_parameter(partNameWithHyphens ,'$' + partNameWithHyphens, partType , true , ["Please Enter " + partName + "."]);
        paramsList.push(param_for_part);
        partsList.push(part);
        partsList.push(part2);
        messageText = messageText  + partName + " - " + "$" + partNameWithHyphens + " ";
    });

    messageText = messageText+" have been successfully stored in our database.";
    var messageTexts = [messageText];
    var trainingPhrasePart = partsList;
    var trainingPhrasesParts = [trainingPhrasePart];

    return {
        "trainingPhrasesParts": trainingPhrasesParts,
        "messageTexts": messageTexts,
        "params": paramsList,
    };
}

exports.createCustomIntent = asyncHandler((req,res) => {
    const {name , projectID , fields} = req.body;

    //console.log("IN CREATE CUSTOM INTENT");
    //nametemp = 'Name And Number';
    //projectIDtemp = 'testagent-gjkk';
    //fieldstemp = [
    //    {
    //        "name": "temp-first-name",
    //        "type": "First Name"
    //    },
    //    {
    //        "name": "mobile-number",
    //        "type": "Phone Number"
    //    }
    //]
    console.log("IN CREATE CUSTOM INTENT");

    var props = getCustomBotProps(name, fields)

    console.log(props);

    try{
        create_intent(
            projectID,
            name,
            props["trainingPhrasesParts"],
            props["params"],
            props["messageTexts"]
        )
        res.status(200).json({"success": "done"});
    }
    catch(err){
        console.log(err);
        res.status(503).json({"status": "failed"});
    }

    //console.log("IN CREATE CUSTOM INTENT 3");
});


