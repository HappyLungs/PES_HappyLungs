const responseObj = {};
const mongodb = require("mongodb");
const errorCodes = require("../helpers/errorCodes.js");
const User = require('./../models/user.model');
const loginHelper = require("../helpers/loginHelpers");
const UserDataLayer = require("./../datalayers/user.datalayer");
const sendResponse = require("../helpers/sendResponse.helper.js");
const sendResponseHelper = require("../helpers/sendResponse.helper.js");

exports.find = async (request, response) => {
    let email;
    if (request.query.email) {
        email = request.query.email;
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "There is no email", {});
        return;
    }
    const where = {};
    where.email = email;
    UserDataLayer.findUser(where)
    .then((userData) => {
        if (userData !== null && typeof userData !== undefined) sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Success", userData);
        else sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "No user found", {});
    })
    .catch(error => {
        sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
    });

};

exports.register = async (request, response, next) => {
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
    let error = false;
    await UserDataLayer.findUser({"email":params.email})
    .then((userData) => {
        if (userData != null && userData != undefined && userData != {}) {
            sendResponseHelper.sendResponse(response, errorCodes.DATA_ALREADY_EXISTS, "The email is already registered", {});
            error = true;
        }
    })
    .catch(error => {
        sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
        error = true;
    });
    if (error) return;

    const {password, confirmPassword} = params;
    if (password !== confirmPassword) {
        responseObj.status  = errorCodes.UNAUTHORIZED;
        responseObj.message = "The passwords don't match";
        responseObj.data    = {};
        response.send(responseObj);
        return;
    }
    else {
        UserDataLayer.create(params)
        .then((userData) => {
            console.log("Created! This is the userData: ", userData);
            console.log (error);
            if (userData !== null && typeof userData !== undefined) {
                responseObj.status  = errorCodes.SUCCESS;
                responseObj.message = "Success";
                responseObj.data    = userData;
            } else {
                responseObj.status  = errorCodes.REQUIRED_PARAMETER_MISSING;
                responseObj.message = "Can't create user";
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
        return;
    }
};

exports.login = async (request, response, next) => {
    let params = {};
    if (request.query) {
        params = request.query;
    } else {
        responseObj.status  = errorCodes.REQUIRED_PARAMETER_MISSING;
        responseObj.message = "Required parameters missing";
        responseObj.data    = {};
        response.send(responseObj);
        return;
    }
    const {email, password} = params;

    if (!loginHelper.validateUserInput(email, password)) {
        responseObj.status  = errorCodes.RESOURCE_NOT_FOUND;
        responseObj.message = "Please check your inputs";
        responseObj.data    = {};
        response.send(responseObj);
        return;
    }

    const where = {};
    where.email = email;
    UserDataLayer.findUser(where)
    .then((userData) => {
        if (userData !== null && typeof userData !== undefined) {
            if (!loginHelper.comparePassword(password, userData.password)) {
                responseObj.status  = errorCodes.RESOURCE_NOT_FOUND;
                responseObj.message = "Invalid password";
                responseObj.data    = {};
                response.send(responseObj);
                return;
            }
            sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Logged successfully", userData);
        }
        else sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "No user found with this email", {});
    })
    .catch(error => {
        sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
    });
};