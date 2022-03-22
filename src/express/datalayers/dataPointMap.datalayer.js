const DataPointMapModel = require('./../models/dataPointMap.model')

exports.createDataPointMap = async (params) => {
    return new Promise((resolve, reject) => {
        console.log(params);
        DataPointMapModel
        .create(params)
        .then((data) => { 
            resolve(data) })
        .catch((error) => { reject(error) })
    })
}


exports.findDataPointMap = async (where = {}) => {
    return new Promise((resolve, reject) => {
        DataPointMapModel
        .findOne(where)
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

exports.insertMany = async (params) => {
    return new Promise((resolve, reject) => {
        DataPointMapModel
        .insertMany(params)
        .then((data) => {
            resolve(data)
        })
        .catch((err) => {
            reject(err)
        })

    })
}