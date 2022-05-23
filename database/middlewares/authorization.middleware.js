const responseObj = {};
const errorCodes = require("../helpers/errorCodes");
const userDatalayer = require("./../datalayers/user.datalayer");

exports.validate = (request, response, next) => {
    if (request.headers.authorization) {
        /* const token = request.headers.authorization; */
        const secretKey = process.env.ENCRYPTION_KEY;
        const token = jwt.sign(request.headers.authorization.split(" ")[1], );
        //Verify access to the API.
        jwt.verify(token, secretKey, (err, decoded) => {
            if (decoded && decoded.userId) {
                const whereCondition = { _id: decoded.userId };
                userDatalayer
                    .findUser(whereCondition)
                    .then(async (user) => {
                        if (!user) {
                            return response.status(errorCodes.UNAUTHORIZED).json({
                                status: errorCodes.UNAUTHORIZED,
                                message: "User not found",
                                data: {}
                            });
                        }
                        if (user.status === 0) { //BLOCKED ACCOUNT
                            responseObj.status = errorCodes.UNAUTHORIZED;
                            responseObj.message = "Account blocked";
                            responseObj.data = {};
                        }

                        response.locals._id = decoded.userId;
                        next();
                    })
                    .catch((err) => {
                        // console.log(err);
                        responseObj.status = errorCodes.BAD_REQUEST;
                        responseObj.message = "Something went wrong";
                        responseObj.data = {};
                        response.send(responseObj);

                    });
            } else {
                responseObj.status = errorCodes.BAD_REQUEST;
                responseObj.message = "Something went wrong";
                responseObj.data = {};
                response.send(responseObj);
                return;
            }
            if (err) {
                // console.log(err.message);
                responseObj.status = errorCodes.BAD_REQUEST;
                responseObj.message = "Access token missing";
                responseObj.data = {};
                response.send(responseObj);

            }
        });
    } else {
        // console.log(err.message);
        responseObj.status = errorCodes.BAD_REQUEST;
        responseObj.message = "Access token missing";
        responseObj.data = {};
        response.send(responseObj);
    }
}