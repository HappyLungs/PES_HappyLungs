const commentDataLayer = require("./../datalayers/comment.datalayer");


async function create (request, response) {


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
    commentDataLayer.createComment(params)
    .then((commentData) => {
        console.log(commentData);
        if (commentData !== null && typeof commentData !== undefined) {
            responseObj.status  = errorCodes.SUCCESS;
            responseObj.message = "Success";
            responseObj.data    = commentData;
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

async function find (request, response) {
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
        commentDataLayer.findComment(where)
        .then((commentData) => {
            if (commentData !== null && typeof commentData !== undefined) {
                responseObj.status  = errorCodes.SUCCESS;
                responseObj.message = "Success";
                responseObj.data    = commentData;
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

export {create, find}