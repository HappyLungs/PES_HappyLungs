const UserDataLayer = require("./../datalayers/user.datalayer");

//Helpers
const errorCodes = require("../helpers/errorCodes.js");
const sendResponseHelper = require("../helpers/sendResponse.helper.js");

exports.blockUser = async (request, response) => {
    let params = {};
    if (!request.body.hasOwnProperty("params") || !request.body.params.hasOwnProperty("email")) {
        sendResponseHelper.sendResponse(response, errorCodes.REQUIRED_PARAMETER_MISSING, "Please provide an email");
        return;
    }
    params.email = request.body.params.email;
    let user = await UserDataLayer.findUser({ email: params.email }).then();
    if (user == null || user == undefined) {
        sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "User not found", {});
        return;
    }
    let update = {};
    if (user.status >= 0) {
        update.status = -1;
    } else {
        update.status = 1;
    }
    await UserDataLayer
    .updateUser({ email: params.email }, update)
    .then((data) => {
        sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Request processed successfully", {});
    }).catch((error) => {
        sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "User not found", {});
        return;
        }
    );
};