const { data } = require('../../../../../tasf-thgu');
const PollutantDayMeasureModel = require('../models/pollutantDayMeasure.model')

exports.createPollutantDayMeasure = async (params) => {
    return new Promise((resolve, reject) => {
        console.log(params);
        PollutantDayMeasureModel
        .create(params)
        .then((data) => { 
            resolve(data) })
        .catch((error) => { reject(error) })
    })
}

exports.findPollutantDayMeasure = async (where = {}) => {
    return new Promise((resolve, reject) => {
        PollutantDayMeasureModel
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
        PollutantDayMeasureModel
        .insertMany(params)
        .then((data) => {
            resolve(data)
        })
        .catch((err) => {
            reject(err)
        })

    })
}