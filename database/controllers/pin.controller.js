// load model
const responseObj = {};
const mongodb = require("mongodb");
const errorCodes = require("../helpers/errorCodes.js");
const { check, validationResult } = require("express-validator");

const userController = require("../controllers/user.controller");

const pinDatalayer = require("./../datalayers/pin.datalayer");
const userDatalayer = require("../datalayers/user.datalayer");

const sendResponseHelper = require("../helpers/sendResponse.helper.js");

exports.list = async (request, response) => {
    let params = {};
    if (request.query.hasOwnProperty("user")) {
        //Get user pins (ordered by date)
        params = request.query;
        //check if user exists
        let result = await userDatalayer.findUser({email: params.user}).then();
        if (result === null || typeof result === "undefined" || result.length === 0) {
            sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "User not found", {});
        } else {
            pinDatalayer.listPins({creatorEmail: params.user})
            .then((pinData) => {
                if (pinData !== null && typeof pinData !== "undefined") {
                    //get pins saved by the user if any
                    if (result.savedPins.length > 0) {
                        userDatalayer.aggregateUser(
                            [
                                {
                                '$match': {
                                    'email': params.user
                                }
                                }, {
                                    '$lookup': {
                                    'from': 'pins', 
                                    'let': {
                                        'savedPins': '$savedPins'
                                    }, 
                                    'pipeline': [
                                        {
                                        '$match': {
                                            '$expr': {
                                            '$and': [
                                                {
                                                '$in': [
                                                    '$_id', '$$savedPins'
                                                ]
                                                }
                                            ]
                                            }
                                        }
                                        }, {
                                        '$sort': {
                                            'date': -1
                                        }
                                        }
                                    ], 
                                    'as': 'savedPins'
                                    }
                                }, {
                                '$project': {
                                    'savedPins': 1, 
                                    '_id': 0
                                }
                                }
                            ]
                        )
                        .then((userPins) => {
                            if (userPins !== null && typeof userPins !== "undefined") {
                                let result = {};
                                result.pins = pinData;
                                result.savedPins = userPins[0].savedPins;
                                sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Success", result);
                            } else {
                                sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "User not found", {});
                            }
                        })
                        .catch((error) => {
                            sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
                        });
                    } else {
                        let result = {};
                        result.pins = pinData;
                        result.savedPins = [];
                        sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Success", result);
                    }
                } else {
                    sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "No record found", {});
                }
            })
            .catch((error) => {
                sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
            });
        }
    } else {
        if (!request.query.hasOwnProperty("email")) {
            sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, "Email is required", {});
            return;
        }
        params = request.query;
        //Get 50 pins from all users (ordered by score)
        pinDatalayer.aggregatePins([
            {
                '$match': {
                    'status': "Public",
                    'creatorEmail': {
                        '$ne': params.email
                    }
                }
            },{
              '$sort': {
                rating: -1,
                date: -1
              }
            }, {
              '$limit': 50
            }
          ])
        .then((pinData) => {
            if (pinData !== null && typeof pinData !== "undefined") {
                sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Success", pinData);
            } else {
                sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "No record found", {});
            }
        })
        .catch((error) => {
            sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
        });
    }
};

exports.create = async (request, response) => {
    let params = {};
    if (request.body.params.title) {
        params = request.body.params;
    } else {
        responseObj.status  = errorCodes.REQUIRED_PARAMETER_MISSING;
        responseObj.message = "Required parameters missing";
        responseObj.data    = {};
        response.send(responseObj);
        return;
    }
    pinDatalayer.createPin(params)
    .then(async (pinData) => {
        if (pinData !== null && typeof pinData !== undefined) {
            await userController.updateUserPoints(pinData.creatorEmail, 6);
            sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Pin created", pinData);
        } else {
            sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, "Pin not created", {});
        }
    })
    .catch(error => {
        sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
    });
};

exports.update = async(request, response) => {
    let params = {};
    if (request.body.params.pin) {
        params = request.body.params;
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "Required parameters missing", {});
        return;
    }
    if (params.pin.hasOwnProperty("_id") && mongodb.ObjectId.isValid(params.pin._id)) {
        pinDatalayer
        .findPin({_id: mongodb.ObjectId(params.pin._id)})
        .then((pinData) => {
            if (pinData !== null && typeof pinData !== "undefined") {
                //update params
                pinDatalayer
                .updatePin({_id: mongodb.ObjectId(params.pin._id)}, params.pin)
                .then(async (result) => {
                    await userController.updateUserPoints(pinData.creatorEmail, 1);
                    sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Success", result);
                })
                .catch((error) => {
                    sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
                })
            } else {
                sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "No record found", {});
            }
        })
        .catch((error) => {
            sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
        })
    } else {
        sendResponseHelper.sendResponse(response, errorCodes.BAD_REQUEST, "Invalid id", {});
    }
};

exports.delete = (request, response) => {
    let params = {};
    if (request.body.params._id) {
        params = request.body.params;
    } else {
        responseObj.status  = errorCodes.REQUIRED_PARAMETER_MISSING;
        responseObj.message = "Required parameters missing";
        responseObj.data    = {};
        response.send(responseObj);
        return;
    }
    pinDatalayer
    .deletePin(params)
    .then((result) => {
        responseObj.status  = errorCodes.SUCCESS;
        responseObj.message = "Pin deleted successfully";
        responseObj.data    = result;
        response.send(responseObj);

    })
    .catch((error) => {
        responseObj.status  = errorCodes.SYNTAX_ERROR;
        responseObj.message = error;
        responseObj.data    = {};
        response.send(responseObj);

    })
};

exports.validate = (method) => {
    switch(method) {
        case "createPin":
            {
                return [
                    check("userId", "User id is required.")
                    .exists()
                    .not()
                    .isEmpty()
                    .withMessage("Empty String")
                    .custom((value) => {
                        const validId = isValidMongoDBId(value);
                        if (validId) {
                            const where = {
                                _id: mongodb.ObjectId(value)
                            };
                            return userDatalayer.findUser(where).then((data) => {
                                if (data.length === 0) return Promise.reject("User not found");
                            });
                        } else {
                            return Promise.reject("Invalid object ID");
                        }
                    })
                ];
            }

        case "updatePin":
            {
                return [
                    check("creatorEmail", "User email is required.")
                    .exists()
                    .not()
                    .isEmpty()
                    .withMessage("Empty string")
                    .custom((value) => {
                        let isValid = true; //TODO: Check if is a valid email
                        if (isValid) {
                            const where = {
                                email: value
                            };
                            return userDatalayer.findUser(where).then((data) => {
                                if (data.length === 0) {
                                    return Promise.reject("User not found");
                                }
                            })
                        } else {
                            return Promise.reject("Invalid email");
                        }
                    })
                ];
            }

    }
};
