const conversationDataLayer = require("./../datalayers/conversation.datalayer.js");
const userDatalayer = require("./../datalayers/user.datalayer.js")
const messageDataLayer = require("./../datalayers/message.datalayer.js") 
const responseObj = {};
const mongodb = require("mongodb");
const errorCodes = require("../helpers/errorCodes.js")
const sendResponseHelper = require("../helpers/sendResponse.helper.js");

exports.find = async (request, response) => {
    let id;
    if (request.query._id) {
        id = request.query._id;
    } else {
        // get all conversations from a given user
        if (!request.query.hasOwnProperty("email")) {
            sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "Required parameters missing", {});
            return;
        }
        let aggregateArr = [
            {
              '$match': {
                users: request.query.email
              }
            }, {
              '$project': {
                'users': 1, 
                'deleted': 1, 
                'index': {
                  '$indexOfArray': [
                    '$users', 'example1@gmail.com'
                  ]
                }
              }
            }, {
              '$project': {
                'users': 1, 
                'deleted': 1, 
                'deletedByUser': {
                  '$arrayElemAt': [
                    '$deleted', '$index'
                  ]
                }
              }
            }, {
              '$match': {
                'deletedByUser': false
              }
            }, {
              '$project': {
                'users': 1, 
                'deleted': 1
              }
            }, {
              '$sort': {
                'createdAt': -1
              }
            }
          ];
          //Get the most recent conversation        TODO: get the conversation with the most recent message
        conversationDataLayer.aggregateConversation(aggregateArr)
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
        if (mongodb.ObjectId.isValid(id)) {
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
        sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "Required parameters missing", {});
        return;
    }
    /* Check if users of the body exists */
    console.log("All users!: ", params.users);
    for (user of params.users) {
      console.log("User: ", user);
        const where = {};
        where.email = user;
        let exists = false;
        await userDatalayer.findUser(where)
        .then((userData) => {
          console.log("UserData: ", userData);
          if (userData !== null && userData !== undefined && userData.email.length > 0) {
            exists = true; 
            console.log("\nThe user exists!!!!");
          }
        });
        if (!exists) {
            sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "User does not exist", {});
            return;
        }
    }
    /* Create the conversation */
    conversationDataLayer.createConversation({users: params.users})
    .then((conversationData) => {
        console.log("Conversation created", conversationData);
        if (conversationData !== null && typeof conversationData !== undefined) {
            //create the message related to the conversation. The first user is the sender
            let message = {
                text: params.message,
                user: params.users[0],
                conversation: conversationData._id
            };
            messageDataLayer.createMessage(message)
            .then((messageData) => {
                if (messageData !== null && typeof messageData !== undefined) {
                    sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "SUCCESS", messageData);
                } else {
                    sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, "Error while creating message", {});
                }
            })
            .catch(error => {
                sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
            });
        } else {
            sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, "Error while creating conversation", {});
        }
    })
    .catch(error => {
        sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
    });
};

exports.delete = async (request, response) => {
    let params = {};
    if (request.body.params) {
        params = request.body.params;
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "Required parameters missing", {});
    }

    
    let result = await conversationDataLayer.findConversation( {_id: params.id} ).then();
    if (result == null || result == undefined || result.length == 0) {
        sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "The conversation does not exist", {});
        return;
    }

    //get the position from the user in the users array
    let index = result.users.indexOf(params.user);
    if (!result.deleted[index] && result.deleted[1-index]) {
      //The conversation have been deleted for both of the users. Delete conversation
       conversationDataLayer.deleteConversation({_id: params.id})
       .then((conversationData) => {
         if (conversationData != null && conversationData != undefined && conversationData.length != 0) {
            sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Sucess", conversationData);
         } else {
            sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, "Bad req", {});
         }
       })
       .catch(error => {
          sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
       })
    } else if (!result.deleted[index] && !result.deleted[1-index]) {
      //Update param deleted from the user
      result.deleted[index] = true;
      conversationDataLayer.updateConversation({_id: params.id}, result)
      .then((conversationData) => {
        if (conversationData != null && conversationData != undefined && conversationData.length != 0) {
          sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Sucess", conversationData);
        } else {
            sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, "Bad req", {});
        }
      })
      .catch(error => {
        sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
      });
    } else {
      //Nothing to be done, return
      sendResponseHelper.sendResponse(response, errorCodes.DATA_ALREADY_EXISTS, "Nothing to be done", {});
    }
}

function aggregateArray(match, group, sort) {   //TODO Generate aggregate array to get all messages related to the conversation
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
