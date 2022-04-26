const responseObj = {};
const errorCodes = require("../helpers/errorCodes");

exports.validate = (request, response, next) => {
    const licenseKey = request.headers['x-api-key'];
    if (licenseKey === "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm") {
        //Continue with the request
        next();
    } else {
        //Send error
        responseObj.status = errorCodes.BAD_REQUEST;
        responseObj.message = "Missing license";
        responseObj.data = {};
        response.send(responseObj);
    }
}