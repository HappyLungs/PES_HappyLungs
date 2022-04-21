function sendResponse (res, statusCode, message, data) {
    let responseObj = {};
    responseObj.status = statusCode;
    responseObj.message = message;
    responseObj.data = data;
    res.send(responseObj);
}

module.exports = sendResponse;