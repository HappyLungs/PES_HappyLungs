const PinModel = require('./../models/pin.model');

exports.createPin = async (params) => {
  return new Promise((resolve, reject) => {
    PinModel
      .create(params)
      .then((data) => { 
          resolve(data) })
      .catch((error) => { reject(error) })
  })
};

exports.updatePin = async (where = {}, updateParams) => {
    return new Promise((resolve, reject) => {
      PinModel.updateMany(where, updateParams)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

exports.findPin = async (where = {}) => {
    return new Promise((resolve, reject) => {
        PinModel
        .findOne(where)
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        })
    })
};

exports.listPins = async (where = {}) => {
    return new Promise((resolve, reject) => {
        PinModel
        .find(where)
        .sort({ date: -1 })
        .then((data) => {
            resolve(data)
        }
        ).catch((error) => {
            reject(error)
        })
    })
};

exports.aggregatePins = async (aggregateArr) => {
    return new Promise((resolve, reject) => {
        PinModel
        .aggregate(aggregateArr)
        .then((data) => {
            resolve(data)
        }
        ).catch((error) => {
            reject(error)
        })
    })
};

exports.deletePin = async (where = {}) => {
    return new Promise((resolve, reject) => {
        PinModel
        .deleteOne(where)
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        })
    })
}