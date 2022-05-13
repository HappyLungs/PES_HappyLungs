const messageDataLayer = require("./../datalayers/message.datalayer.js");
const conversationDataLayer = require("./../datalayers/conversation.datalayer.js");
const userDatalayer =  require("./../datalayers/user.datalayer.js");
//const sanitizeHtml = require('sanitize-html');

const userCtrl = require("./user.controller.js");

//const responseObj = {};
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
                            'createdAt': 1
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
                });
                return;
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

    let where = {};
    where.email = params.user;
    let result = await userDatalayer.findUser(where).then();
    if (result == null || result.length === 0) {
        sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "User not found", {});
        return;
    }
    /* Check if Conversation exists of the body  */
    if (mongodb.ObjectId.isValid(params.conversation)) {
        where = {};
        where._id = mongodb.ObjectId(params.conversation);
        let result_conver = await conversationDataLayer.findConversation(where).then();
        if (result_conver == null || result_conver.length === 0) {
            sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "Conversation not found", {});
            return;
        }
        await messageDataLayer.createMessage(params)
        .then((messageData) => {
            if (messageData !== null && typeof messageData !== undefined) {
                sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Success", messageData);
            } else {
                sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, "Cannot create the message", {});
            }
        })
        .catch(error => {
            sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
        });
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, "Invalid conversation id", {});
    }
};

exports.lastMessage = async (request, response) => {
    let params = {};
    if (request.query.conversation) {
        params = request.query;
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "Required parameters missing", {});
        return;
    }
    if (mongodb.ObjectId.isValid(params.conversation)) {
        let aggregateArr = [
            {
              '$match': {
                'conversation': mongodb.ObjectId(params.conversation)
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
    }
}

exports.unreadedMessages = async (request, response) => {
    let params = {};
    if (request.query.conversation) {
        params = request.query;
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "Required parameters missing", {});
        return;
    }
    if (mongodb.ObjectId.isValid(params.conversation)) {
        const criteria = {};
        criteria['$and'] = [];
        criteria['$and'].push({
            conversation: {
                $eq: mongodb.ObjectId(params.conversation)
            }
        });
        criteria['$and'].push({
            user: {
                $ne: params.email
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
    }
}

exports.reportMessage = async (request, response) => {
    let params = {};
    if (request.body.params) {
        params = request.body.params;
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "Required parameters missing", {});
        return;
    }
    if (mongodb.ObjectId.isValid(params.message)) {
        let where = {};
        where._id = mongodb.ObjectId(params.message);
        messageDataLayer.findMessage(where)
        .then((messageData) => {
            if (messageData !== null && typeof messageData !== undefined) {
                messageData.reported = true;
                messageDataLayer.updateMessage({_id: messageData._id}, messageData)
                .then(async (messageData) => {
                    if (messageData !== null && typeof messageData !== undefined) {
                        await userCtrl.updateReports(messageData.user);
                        sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Success", messageData);
                    }
                })
                .catch(error => {
                    sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
                });
            } else {
                sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "No record found", {});
            }
        })
        .catch(error => {
            sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
        });
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, "Invalid id", {});
    }
}