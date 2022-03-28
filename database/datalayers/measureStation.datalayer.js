const MeasureStation = require('./../models/measureStation.model')

exports.createMeasureStation = async (params) => {
    return new Promise((resolve, reject) => {
        console.log(params);
        MeasureStation
        .create(params)
        .then((data) => { 
            resolve(data) })
        .catch((error) => { reject(error) })
    })
}


exports.findMeasureStation = async (where = {}) => {
    return new Promise((resolve, reject) => {
        MeasureStation
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
        MeasureStation
        .insertMany(params)
        .then((data) => {
            resolve(data)
        })
        .catch((err) => {
            reject(err)
        })

    })
}

exports.aggregateMeasureStation = async (aggregateArr) => {
    return new Promise((resolve, reject) => {
        MeasureStation
        .aggregate(aggregateArr)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    });
}