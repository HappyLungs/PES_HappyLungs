const MessageModel = require('./../models/message.model');

exports.createMessage = async (params) => {
    return new Promise((resolve, reject) => {
        MessageModel
        .create(params)
        .then((data) => { 
            resolve(data) })
        .catch((error) => { reject(error) })
    })
  
  };
  
  exports.updateMessage = async (where = {}, updateParams = {}) => {
      return new Promise((resolve, reject) => {
        MessageModel.findOneAndUpdate(where, updateParams)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

exports.updateMessages = async (where = {}, updateParams = {}) => {
    return new Promise((resolve, reject) => {
        MessageModel.updateMany(where, updateParams)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};


  exports.findMessage = async (where = {}) => {
      return new Promise((resolve, reject) => {
        MessageModel
          .findOne(where)
          .then((data) => {
              resolve(data)
          })
          .catch((error) => {
              reject(error)
          })
      })
  };
  
  exports.deleteMessage = async (where = {}) => {
      return new Promise((resolve, reject) => {
        MessageModel
          .deleteOne(where)
          .then((data) => {
              resolve(data)
          })
          .catch((error) => {
              reject(error)
          })
      })
  };

  exports.aggregateMessage = async (aggregateArr) => {
    return new Promise((resolve, reject) => {
      MessageModel
        .aggregate(aggregateArr)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        });
    });
};

exports.listMessages = async (params) => {
    return new Promise((resolve, reject) => {
        MessageModel
        .find(params)
        .then((data) => { 
            resolve(data) })
        .catch((error) => { reject(error) })
    });
};