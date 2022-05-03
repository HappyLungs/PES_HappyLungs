const ConversationModel = require('./../models/conversation.model');

exports.createConversation = async (params) => {
  return new Promise((resolve, reject) => {
    ConversationModel
    .create(params)
    .then((data) => { 
        resolve(data) })
    .catch((error) => { reject(error) })
  })
};
  
exports.updateConversation = async (where = {}, updateParams) => {
  return new Promise((resolve, reject) => {
    ConversationModel.updateMany(where, updateParams)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.updateConversation_byMessageCreation = async (where = {}, updateParams) => {
  return new Promise((resolve, reject) => {
    ConversationModel.findByIdAndUpdate(where._id, { $push : { messages: updateParams }})
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.findConversation = async (where = {}) => {
    return new Promise((resolve, reject) => {
      ConversationModel
        .findOne(where)
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        })
    })
};

exports.findConversations = async () => {
  return new Promise((resolve, reject) => {
    ConversationModel
      .find({})
      .then((data) => {
          resolve(data)
      })
      .catch((error) => {
          reject(error)
      })
  })
};

exports.deleteConversation = async (where = {}) => {
    return new Promise((resolve, reject) => {
      ConversationModel
        .deleteOne(where)
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

exports.aggregateConversation = async (aggregateArr) => {
  return new Promise((resolve, reject) => {
    ConversationModel
      .aggregate(aggregateArr)
      .then((data) => {
          resolve(data);
      })
      .catch((error) => {
          reject(error);
      });
  });
};