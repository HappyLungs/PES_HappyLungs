const responseObj = {};
const mongodb = require("mongodb");

//Helpers
const errorCodes = require("../helpers/errorCodes.js");

const User = require('./../models/user.model');
const loginHelpers = require("../helpers/loginHelpers");
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
    if (request.body.params.name && request.body.params.email && request.body.params.password && request.body.params.confirmPassword && request.body.params.birthdate) {
        params = request.body.params;
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "Required parameters missing", {});
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
            sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
        });
        return;
    }
};

exports.login = async (request, response) => {
    let params = {};
    if (request.query) {
        params = request.query;
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "Required parameters missing", {});
        return;
    }
    const {email, password} = params;

    const where = {};
    where.email = email;
    UserDataLayer.findUser(where)
    .then((userData) => {
        if (userData !== null && typeof userData !== undefined) {
            if (!loginHelpers.comparePassword(password, userData.password)) {
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

function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

exports.changePassword = async (request, response) => {
    let params = {};
    if (request.body.params) {
        params = request.body.params;
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "Required parameters missing", {});
        return;
    }
    //Find the user given the id in the params
    userDatalayer.findUser({email: params.email})
    .then((userData) => {
        if (userData !== null && typeof userData !== undefined) {
            //Check if the password is correct
            if (comparePassword(params.oldPassword, userData.password)) {
                //If the password is correct, update the password, hashed with bcrypt
                userDatalayer.updateUser({email: params.email}, {password: bcrypt.hashSync(params.newPassword, 10)})
                .then((updatedData) => {
                    if (updatedData !== null && typeof updatedData !== undefined) {
                        sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Success", updatedData);
                    } else {
                        sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "No record found", {});
                    }
                })
                .catch(error => {
                    sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
                });
            } else {
                sendResponseHelper.sendResponse(response, errorCodes.UNAUTHORIZED, "Old password is incorrect", {});
            }
        } else {
            sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "No record found", {});
        }
    })
}

exports.delete = async (request, response) => {
    let params = {};
    if (request.body.params) {
        params = request.body.params;
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "Required parameters missing", {});
        return;
    }
    userDatalayer
    .findUser({_id: mongodb.ObjectId(params.id)})
    .then((userData) => {
        if (userData !== undefined && userData !== null) {
            userDatalayer
            .deleteUser({_id: mongodb.ObjectId(params.id)})
            .then((deletedData) => {
                sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Success", deletedData);
            })
            .catch(error => {
                sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
            });
        }
    })
    .catch(error => {
        sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
    });
}
