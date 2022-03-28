const MeasureModel = require('./../models/measure.model')

exports.createMeasure = async (params) => {
    return new Promise((resolve, reject) => {
        MeasureModel
        .create(params)
        .then((data) => { 
            resolve(data) })
        .catch((error) => { reject(error) })
    })
}


exports.findMeasure = async (where = {}) => {
    return new Promise((resolve, reject) => {
        MeasureModel
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
        MeasureModel
        .insertMany(params)
        .then((data) => {
            resolve(data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}