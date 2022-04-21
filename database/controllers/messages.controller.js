const messageDataLayer = require("./../datalayers/message.datalayer.js");
const responseObj = {};
const mongodb = require("mongodb");
const errorCodes = require("../helpers/errorCodes.js")
exports.find = async (request, response) => {
    let id;
    if (request.query._id) {
        console.log("Hola que tal como estamos");

        id = request.query._id;
    } else {
        responseObj.status  = errorCodes.REQUIRED_PARAMETER_MISSING;
        responseObj.message = "Required parameters missing";
        responseObj.data    = {};
        response.send(responseObj);
        return;
    }
    if (mongodb.ObjectId.isValid(mongodb.ObjectId(id))) {
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
    if (request.body.params) {

        params = request.body.params;
    } else {
        responseObj.status  = errorCodes.REQUIRED_PARAMETER_MISSING;
        responseObj.message = "Required parameters missing";
        responseObj.data    = {};
        response.send(responseObj);
        return;
    }
    messageDataLayer.createMessage(params)
    .then((messageData) => {
        console.log(messageData);
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

};