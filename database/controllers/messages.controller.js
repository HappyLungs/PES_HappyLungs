const messageDataLayer = require("./../datalayers/message.datalayer.js");
const conversationDataLayer = require("./../datalayers/conversation.datalayer.js");
const userDatalayer =  require("./../datalayers/user.datalayer.js");


const responseObj = {};
const mongodb = require("mongodb");
const errorCodes = require("../helpers/errorCodes.js")
const sendResponseHelper = require("../helpers/sendResponse.helper.js");

exports.find = async (request, response) => {
    let id;
    if (request.query._id) {
        id = request.query._id;
    } else {
        if (request.query.hasOwnProperty("conversation")) {
            if (mongodb.ObjectId.isValid(request.query.conversation)) {
                let aggregateArr = [
                    {
                        '$match': {
                            conversation: mongodb.ObjectId(request.query.conversation)
                        }
                    }, {
                        '$sort': {
                            'createdAt': -1
                        }
                    }
                ];
                messageDataLayer.aggregateMessage(aggregateArr)
                .then((messageData) => {
                    if (messageData !== null && typeof messageData !== undefined) {
                        sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Success", messageData);
                    } else {
                        sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "No record found", {});
                    }
                })
                .catch(error => {
                    sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
                    return;
                });
            } else {
                sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, "Invalid conversation id", {});
                return;
            }
        } else {
            sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "Required parameters missing", {});
            return;
        }
    }
    if (mongodb.ObjectId.isValid(id)) {
        const where = {};
        where._id = mongodb.ObjectId(id);
        messageDataLayer.findMessage(where)
        .then((messageData) => {
            if (messageData !== null && typeof messageData !== undefined) {
                responseObj.status  = errorCodes.SUCCESS;
                responseObj.message = "Success";
                responseObj.data    = messageData;
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

};

exports.create = async (request, response) => {
    let params = {};
    var message_id;

    if (request.body.params) {

        params = request.body.params;
    } else {
        responseObj.status  = errorCodes.REQUIRED_PARAMETER_MISSING;
        responseObj.message = "Required parameters missing";
        responseObj.data    = {};
        response.send(responseObj);
        return;
    }
/* Check if user of the body  */

const user = request.body.params.user
const where = {};
where.email = request.body.params.email;
let result = await userDatalayer.findUser(where).then();
if (result != null) console.log("Usuario encontrado");
else {
  console.log("Usuario no encontrado");
  responseObj.status = errorCodes.RESOURCE_NOT_FOUND;
  responseObj.message = `User ${user} doesn't exist`;
  responseObj.data = {};
  response.send(responseObj);
  return;
}


/* Check if Conversation exists of the body  */

const conver = request.body.params.conversation
const where2 = {};
where2._id = mongodb.ObjectId(conver);
let result_conver = await conversationDataLayer.findConversation(where2).then();
if (result_conver != null) console.log("Conversacion encontrada");
else {
  console.log("Conversación no encontrada");
  responseObj.status = errorCodes.RESOURCE_NOT_FOUND;
  responseObj.message = `Conversation ${conver} doesn't exist`;
  responseObj.data = {};
  response.send(responseObj);
  return;
}


    await messageDataLayer.createMessage(params)
    .then((messageData) => {
        if (messageData !== null && typeof messageData !== undefined) {
            responseObj.status  = errorCodes.SUCCESS;
            responseObj.message = "Success";
            responseObj.data    = messageData;
            message_id = responseObj.data._id;
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
    const where3 = {};
    where3._id = mongodb.ObjectId(request.body.params.conversation);
    conversationDataLayer.updateConversation_byMessageCreation(where3, message_id)
    .then((messageData) => {
        if (messageData !== null && typeof messageData !== undefined) {
            responseObj.status  = errorCodes.SUCCESS;
            responseObj.message = "Success";
            responseObj.data    = messageData;
        } else {
            responseObj.status  = errorCodes.DATA_NOT_FOUND;
            responseObj.message = "No record found";
            responseObj.data    = {};
        }

    
    })
    .catch(error => {
        responseObj.status  = errorCodes.SYNTAX_ERROR;
        responseObj.message = error;
        responseObj.data    = {};
        response.send(responseObj);
    });

};

exports.lastMessage = async (request, response) => {
    let params = {};
    if (request.query.params) {
        params = request.query.params;
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "Required parameters missing", {});
        return;
    }
    if (mongodb.ObjectId.isValid(params.conversation)) {
        let aggregateArr = [
            {
              '$match': {
                'conversation': params.conversation
              }
            }, {
              '$sort': {
                'createdAt': -1
              }
            }, {
              '$limit': 1
            }
          ];
        messageDataLayer.aggregateMessage(aggregateArr)
        .then((messageData) => {
            if (messageData !== null && typeof messageData !== undefined) {
                sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Success", messageData);
            } else {
                sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "No record found", {});
            }
        })
        .catch(error => {
            sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
        });
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, "Invalid id", {});
        return;
    }
}

exports.unreadedMessages = async (request, response) => {
    let params = {};
    if (request.query.params) {
        params = request.query.params;
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "Required parameters missing", {});
        return;
    }
    if (mongodb.ObjectId.isValid(params.conversation)) {
        const criteria = {};
        criteria['$and'] = [];
        criteria['$and'].push({
            conversation: {
                $eq: params.conversation
            }
        });
        criteria['$and'].push({
            user: {
                $eq: params.email
            }
        });
        criteria['$and'].push({
            readed: {
                $eq: false
            }
        });
        let aggregateArr = [
            {
              '$match': criteria
            }, {
              '$count': 'total'
            }
          ];
        messageDataLayer.aggregateMessage(aggregateArr)
        .then((messageData) => {
            if (messageData !== null && typeof messageData !== undefined) {
                sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Success", messageData);
            } else {
                sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "No record found", {});
            }
        })
        .catch(error => {
            sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
        });
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, "Invalid id", {});
        return;
    }
}