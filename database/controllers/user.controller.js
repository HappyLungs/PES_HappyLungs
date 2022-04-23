const asyncErrorWrapper = require("express-async-handler");
const User = require('./../models/user.model');
const loginHelper = require("../helpers/loginHelpers");
const UserDataLayer = require("./../datalayers/user.datalayer");

// generateJWTFromUser = function () {
//     const {JWT_SECRET_KEY, JWT_EXPIRE} = process.env;
//     const payload = {
//         id: this._id,
//         email: this.email
//     };
//     const token = jwt.sign(payload, JWT_SECRET_KEY,{
//         expiresIn:JWT_EXPIRE
//     });
//     return token;
// };

exports.find = async (request, response, next) => {
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
            console.log(userData);
            if (userData !== null && typeof userData !== undefined) {
                responseObj.status  = errorCodes.SUCCESS;
                responseObj.message = "Success";
                responseObj.data    = userData;
                responseObj.acces_token = generateJWTFromUser();    //Falta afegir la info del token
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
    if (request.body.params) {
        params = request.body.params;
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

    if (mongodb.ObjectId.isValid(mongodb.ObjectId(id))) {
        const where = {};
        where._id = mongodb.ObjectId(id);
        UserDataLayer.findUser(where)
        .then((userData) => {
            if (userData !== null && typeof userData !== undefined) {
                responseObj.status  = errorCodes.SUCCESS;
                responseObj.message = "Success";
                responseObj.data    = userData;
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

    if (!loginHelper.comparePassword(password,user.password)) {
        responseObj.status  = errorCodes.RESOURCE_NOT_FOUND;
        responseObj.message = "Invalid password";
        responseObj.data    = {};
        response.send(responseObj);
        return;
    }
    const token= generateJwtFromUser();
    return response.status(200)
        .json({
            access_token:token,
            data:{
                email: user.email,
                id: user._id
            }
        })
};