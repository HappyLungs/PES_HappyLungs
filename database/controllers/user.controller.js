const responseObj = {};
const mongodb = require("mongodb");

//Helpers
const errorCodes = require("../helpers/errorCodes.js");

const loginHelpers = require("../helpers/loginHelpers");

const sendResponseHelper = require("../helpers/sendResponse.helper.js");

//Datalayers
const UserDataLayer = require("./../datalayers/user.datalayer");
const ConversationDatalayer = require("./../datalayers/conversation.datalayer");
const { param } = require("../routes/index.route.js");


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

exports.users = async (request, response) => {
    let params = request.query;
    let where = {};
    if (!params.hasOwnProperty("email")) {
        sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "Required parameters missing", {});

    } else {
        // find all users in the database that have at least one conversation with the user with the given email
        let aggregateArr = [
            {
              '$match': {
                'users': params.email
              }
            }, {
              '$unwind': {
                'path': '$users', 
                'preserveNullAndEmptyArrays': true
              }
            }, {
              '$match': {
                'users': {
                  '$ne': params.email
                }
              }
            }, {
              '$group': {
                '_id': 'users', 
                'users': {
                  '$push': '$users'
                }
              }
            }, {
              '$project': {
                'users': 1, 
                '_id': 0
              }
            }
          ];
        let users = [];
        await ConversationDatalayer.aggregateConversation(aggregateArr).then((userData) => {
            if (userData !== null && typeof userData !== undefined) {
                if (userData.length > 0) {
                    users = userData[0].users;
                }
            }
        });
        users.push(params.email);   //Add the user himself to the list
        where.email = {
            $nin: users
        };
        //Find all users that doesent have any conversation with the user with the given email
        UserDataLayer.findUsers(where)
        .then((userData) => {
            if (userData !== null && typeof userData !== undefined) {
                sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Success", userData);
            } else {
                sendResponseHelper.sendResponse(response, errorCodes.NO_DATA_FOUND, "No data found", {});
            }
        })
        .catch(error => {
            sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
        });
    }
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
        if (userData != null && userData !== {}) {
            sendResponseHelper.sendResponse(response, errorCodes.DATA_ALREADY_EXISTS, "The email is already registered", {});
            error = true;
        }
    })
    .catch(error => {
        sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
    });
    if (error) return;

    const {password, confirmPassword} = params;
    if (password !== confirmPassword) {
        responseObj.status  = errorCodes.UNAUTHORIZED;
        responseObj.message = "The passwords don't match";
        responseObj.data    = {};
        response.send(responseObj);

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

exports.updateUser = async (request, response) => {
    let params = {};
    if (request.body.params) {
        params = request.body.params;
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "Required parameters missing", {});
        return;
    }
    UserDataLayer.updateUser({email: params.email}, params)
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
};

function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

exports.changePassword = async (request, response) => {
    console.log("DATABASE IS RECEIVING THIS")
    console.log("BODY", request.body)
    console.log("params", request.body.params)

    let params = {};
    if (request.body.params) {
        params = request.body.params;
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "Required parameters missing", {});
        return;
    }
    //Find the user given the id in the params
    UserDataLayer.findUser({email: params.email})
    .then((userData) => {
        if (userData !== null && typeof userData !== undefined) {
            //Check if the password is correct
            console.log("The old Password: ", params.oldPassword)
            console.log("The new Password: ", params.password)
            if (comparePassword(params.oldPassword, userData.password)) {
                //If the password is correct, update the password, hashed with bcrypt
                UserDataLayer.updateUser({email: params.email}, {password: bcrypt.hashSync(params.newPassword, 10)})
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

exports.savePin = async (request, response) => {
    let params = {};
    if (request.body.params) {
        params = request.body.params;
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "Required parameters missing", {});
        return;
    }
    //Find the user given the id in the params
    let result = await UserDataLayer.findUser({email: params.email}).then();
    if (result == null && typeof result == undefined) {
        sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "Invalid user", {});
        return;
    } 
    if (result.savedPins.indexOf(params.pin) > -1) {
        sendResponseHelper.sendResponse(response, errorCodes.DATA_ALREADY_EXISTS, "Pin already saved", {});
        return;
    }
    UserDataLayer.updateUser({email: params.email}, {$push: {savedPins: params.pin}})
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
}

exports.delete = async (request, response) => {
    let params = {};
    if (request.body.params) {
        params = request.body.params;
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "Required parameters missing", {});
        return;
    }
    UserDataLayer
    .findUser({email: params.email})
    .then((userData) => {
        if (userData !== undefined && userData !== null) {
            UserDataLayer
            .deleteUser({email: params.email})
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