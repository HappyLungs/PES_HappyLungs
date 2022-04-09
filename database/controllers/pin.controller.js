// load model
const responseObj = {};
const mongodb = require("mongodb");
const errorCodes = require("../helpers/errorCodes.js");
const { check, validationResult } = require("express-validator");

const pinDatalayer = require("./../datalayers/pin.datalayer");
const userDatalayer = require("../datalayers/user.datalayer");

exports.find = async (request, response) => {
    console.log(request);
    let id;
    if (request.query._id) {
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
        pinDatalayer.findPin(where)
        .then((pinData) => {
            if (pinData !== null && typeof pinData !== undefined) {
                responseObj.status  = errorCodes.SUCCESS;
                responseObj.message = "Success";
                responseObj.data    = pinData;
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
    return;
};

exports.create = async (request, response, next) => {
    let params = {};
    if (request.body.title) {
        params = request.body;
    } else {
        responseObj.status  = errorCodes.REQUIRED_PARAMETER_MISSING;
        responseObj.message = "Required parameters missing";
        responseObj.data    = {};
        response.send(responseObj);
        return;
    }
    pinDatalayer.createPin(params)
    .then((pinData) => {
        console.log(pinData);
        if (pinData !== null && typeof pinData !== undefined) {
            responseObj.status  = errorCodes.SUCCESS;
            responseObj.message = "Success";
            responseObj.data    = pinData;
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
    return;
};

exports.update = async(request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(errorCodes.REQUIRED_PARAMETER_MISSING).json({
            status: errorCodes.REQUIRED_PARAMETER_MISSING,
            message: "Required parameters missing",
            data: errors.array()
        })
    }
    const body = request.body;
    let params = null;
    if (request.params._id) {
        params = request.params;
    }
    pinDatalayer
    .findPin(params)
    .then((pinData) => {
        if (pinData !== null && typeof pinData !== "undefined") {
            //update params
            pinDatalayer
            .updatePin(params, body)
            .then((result) => {
                console.log("result: ", result);
                responseObj.status  = errorCodes.SUCCESS;
                responseObj.message = "Pin updated successfully";
                responseObj.data    = result;
                response.send(responseObj);
                return;
            })
            .catch((error) => {
                responseObj.status  = errorCodes.SYNTAX_ERROR;
                responseObj.message = error;
                responseObj.data    = {};
                response.send(responseObj);
                return;
            })
        } else {
            responseObj.status  = errorCodes.DATA_NOT_FOUND;
            responseObj.message = "No record found";
            responseObj.data    = {};
            response.send(responseObj);
        }
    })
    .catch((error) => {
        responseObj.status  = errorCodes.SYNTAX_ERROR;
        responseObj.message = error;
        responseObj.data    = {};
        response.send(responseObj);
    })
};

exports.delete = (request, response, next) => {
    let params = {};
    if (request.params._id) {
        params = request.params;
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
        return;
    })
    .catch((error) => {
        responseObj.status  = errorCodes.SYNTAX_ERROR;
        responseObj.message = error;
        responseObj.data    = {};
        response.send(responseObj);
        return;
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
                                if (data.length == 0) return Promise.reject("User not found");
                            });
                        } else {
                            return Promise.reject("Invalid object ID");
                        }
                    })
                ];
            }
            break;
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
                                if (data.length == 0) {
                                    return Promise.reject("User not found");
                                }
                            })
                        } else {
                            return Promise.reject("Invalid email");
                        }
                    })
                ];
            }
            break;
    }
};