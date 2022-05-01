const conversationDataLayer = require("./../datalayers/conversation.datalayer.js");
const userDatalayer = require("./../datalayers/user.datalayer.js")
const messageDataLayer = require("./../datalayers/message.datalayer.js") 
const responseObj = {};
const mongodb = require("mongodb");
const errorCodes = require("../helpers/errorCodes.js")
exports.find = async (request, response) => {
    let id;
    if (request.query._id) {
        id = request.query._id;
    } else {
        conversationDataLayer.findConversations()
        .then((conversationData) => {
            if (conversationData !== null && typeof conversationData !== undefined) {
                responseObj.status  = errorCodes.SUCCESS;
                responseObj.message = "Success";
                responseObj.data    = conversationData;
            } else {
                responseObj.status  = errorCodes.DATA_NOT_FOUND;
                responseObj.message = "No record found";
                responseObj.data    = {};
            }
            response.send(responseObj);
        })
        .catch(error => {
            responseObj.status  = errorCodes.SYNTAX_ERROR;
            responseObj.message = error;
            responseObj.data    = {};
            response.send(responseObj);
        });
    }
    if(typeof id !== "undefined"){
        if (mongodb.ObjectId.isValid(mongodb.ObjectId(id))) {
            const where = {};
            where._id = mongodb.ObjectId(id);
            conversationDataLayer.findConversation(where)
            .then((conversationData) => {
                if (conversationData !== null && typeof conversationData !== undefined) {
                    responseObj.status  = errorCodes.SUCCESS;
                    responseObj.message = "Success";
                    responseObj.data    = conversationData;
                } else {
                    responseObj.status  = errorCodes.DATA_NOT_FOUND;
                    responseObj.message = "No record found";
                    responseObj.data    = {};
                }
                response.send(responseObj);
            })
            .catch(error => {
                responseObj.status  = errorCodes.SYNTAX_ERROR;
                responseObj.message = error;
                responseObj.data    = {};
                response.send(responseObj);
            });
        } else {
            responseObj.status  = errorCodes.SYNTAX_ERROR;
            responseObj.message = "Invalid id";
            responseObj.data    = {};
            response.send(responseObj);
        }


    }
    

};

exports.create = async (request, response) => {
    let params = {};
    if (request.body.params) {
        params = request.body.params;
    } else {
        responseObj.status  = errorCodes.REQUIRED_PARAMETER_MISSING;
        responseObj.message = "Required parameters missing";
        responseObj.data    = {};
        response.send(responseObj);
        return;
    }
         /* Check if users of the body exists */
    request.body.params.users.forEach(async email => {
        const where = {};
        where.email = email;
        let result = await userDatalayer.findUser(where).then();
        if(result != null) console.log("Usuario encontrado");
        else {
            console.log("Usuario no encontrado");
            responseObj.status  = errorCodes.RESOURCE_NOT_FOUND;
            responseObj.message = `User ${email} doesn't exist`;
            responseObj.data    = {};
            response.send(responseObj);
            return;    
        }
    });
       /* Check if messages of the body exists */

    request.body.params.messages.forEach(async message => {
        const where = {};
        where._id = mongodb.ObjectId(message);
        let result = await messageDataLayer.findMessage(where).then();
        if(result != null) console.log("Mensaje encontrado");
        else {
            console.log("Mensaje no encontrado");
            responseObj.status  = errorCodes.RESOURCE_NOT_FOUND;
            responseObj.message = `Message ${message} doesn't exist`;
            responseObj.data    = {};
            response.send(responseObj);
            return;    
        }
    });
    
          /* Create the conversation */
    conversationDataLayer.createConversation(params)
    .then((conversationData) => {
        console.log(conversationData);
        if (conversationData !== null && typeof conversationData !== undefined) {
            responseObj.status  = errorCodes.SUCCESS;
            responseObj.message = "Success";
            responseObj.data    = conversationData;
        } else {
            responseObj.status  = errorCodes.DATA_NOT_FOUND;
            responseObj.message = "No record found";
            responseObj.data    = {};
        }
        response.send(responseObj);
    })
    .catch(error => {
        responseObj.status  = errorCodes.SYNTAX_ERROR;
        responseObj.message = error;
        responseObj.data    = {};
        response.send(responseObj);
    });

};

function aggregateArray(match, group, sort) {
    return [
        {
            $match: match
        },
        {
            $group: group
        },
        {
            $sort: sort
        }
    ];
}