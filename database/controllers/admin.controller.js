const UserDataLayer = require("./../datalayers/user.datalayer");
const MessageDatalayer = require("./../datalayers/message.datalayer");
const mongodb = require("mongodb");

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

exports.listUsers = async (request, response) => {
    //get parameter from request
    let params = {};
    if (!request.query.hasOwnProperty("type")) params.type = "all";
    else {
        params.type = request.query.type;
    }
    let where = {}
    if (params.type === "blocked") where.status = -1;
    else if (params.type === "reported") {
        where.status = 1;
        where.reported = { 
            $gte: 10
        };
    } else {
        where.status = {
            $ne: 0
        }
    }

    let aggregateArr = [
        {
          '$sort': {
            'points': -1
          }
        }, {
          '$group': {
            '_id': {}, 
            'arr': {
              '$push': {
                'name': '$name', 
                'email': '$email', 
                'profilePicture': '$profilePicture', 
                'status': '$status', 
                'reported': '$reported', 
                'points': '$points'
              }
            }
          }
        }, {
          '$unwind': {
            'path': '$arr', 
            'includeArrayIndex': 'ranking'
          }
        }, {
          '$project': {
            '_id': 0, 
            'name': '$arr.name', 
            'email': '$arr.email', 
            'profilePicture': '$arr.profilePicture', 
            'status': '$arr.status', 
            'reported': '$arr.reported', 
            'ranking': '$ranking'
          }
        }, {
          '$match': where
        }, {
          '$lookup': {
            'from': 'conversations', 
            'localField': 'email', 
            'foreignField': 'users', 
            'pipeline': [
              {
                '$count': 'chats'
              }
            ], 
            'as': 'chats'
          }
        }, {
          '$unwind': {
            'path': '$chats', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$lookup': {
            'from': 'pins', 
            'localField': 'email', 
            'foreignField': 'creatorEmail', 
            'pipeline': [
              {
                '$count': 'pins'
              }
            ], 
            'as': 'pins'
          }
        }, {
          '$unwind': {
            'path': '$pins', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$addFields': {
            'chats': '$chats.chats', 
            'pins': '$pins.pins', 
            'ranking': '$ranking'
          }
        }
      ]

    await UserDataLayer.aggregateUser(aggregateArr)
    .then((userData) => {
        if (userData == null || userData == undefined || userData.length == 0) {
            sendResponseHelper.sendResponse(response, errorCodes.DATA_NOT_FOUND, "User not found", {});
            return;
        } else {
            sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Request processed successfully", userData);
        }
    })
    .catch((error) => {
        sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
    });
};

exports.listReportedMessages = async (request, response) => {
  let params = {};
  if (request.query.email) {
    params.email = request.query.email;
  }

  let where = {};
  where.user = params.email;
  where.reported = {
    $ne: 0
  };

  let aggregateArr = [
    {
      '$match': {
        'user': params.email, 
        'reported': {
          '$ne': 0
        }
      }
    }, {
      '$lookup': {
        'from': 'conversations', 
        'localField': 'conversation', 
        'foreignField': '_id', 
        'let': {
          'user': '$user'
        }, 
        'pipeline': [
          {
            '$project': {
              '_id': 0
            }
          }
        ], 
        'as': 'reportantUsername'
      }
    }, {
      '$unwind': {
        'path': '$reportantUsername', 
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$addFields': {
        'reportantUsername': '$reportantUsername.users'
      }
    }, {
      '$addFields': {
        'reportantUsername': {
          '$arrayElemAt': [
            '$reportantUsername', {
              '$subtract': [
                1, {
                  '$indexOfArray': [
                    '$reportantUsername', '$user'
                  ]
                }
              ]
            }
          ]
        }
      }
    }, {
      '$lookup': {
        'from': 'users', 
        'localField': 'reportantUsername', 
        'foreignField': 'email', 
        'pipeline': [
          {
            '$project': {
              'name': 1, 
              '_id': 0
            }
          }
        ], 
        'as': 'reportantUsername'
      }
    }, {
      '$unwind': {
        'path': '$reportantUsername', 
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$addFields': {
        'reportantUsername': '$reportantUsername.name'
      }
    }, {
      '$sort': {
        'createdAt': -1
      }
    }
  ];
  MessageDatalayer.aggregateMessage(aggregateArr)
  .then((data) => {
    if (data == null || data == undefined || data.length == 0) {
      sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "No messages found", []);
      return;
    } else {
      sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Request processed successfully", data);
    }
  })
  .catch((error) => {
    sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
  });
}

exports.updateReportedMessage = async (request, response) => {
  let params = {};
  if (request.body.messageId) {
    params = request.body;
  }
  let where = {};
  if (mongodb.ObjectId.isValid(params.messageId)) {
    where._id = mongodb.ObjectId(params.messageId);
  }
  MessageDatalayer.updateMessage(where, {$set: {reported: params.reported}})
  .then((data) => {
    sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "SUCCESS", data);
  })
  .catch((error) => {
    sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, error, {});
  });
}