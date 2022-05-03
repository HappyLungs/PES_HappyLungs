const UserModel = require('./../models/user.model')

exports.create = async (params) => {
    return new Promise((resolve, reject) => {
        UserModel
        .create(params)
        .then((data) => { 
            resolve(data) })
        .catch((error) => { reject(error) })
    })
}

exports.findUser = async (where = {}) => {
    return new Promise((resolve, reject) => {
        UserModel
        .findOne(where)
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

exports.findUsers = async (where = {}) => {
    return new Promise((resolve, reject) => {
        UserModel
        .find(where)
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        })
    })
}
exports.deleteUser = async (where = {}) => {
    return new Promise((resolve, reject) => {
        UserModel
        .deleteOne(where)
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

exports.aggregateUser = async (aggregateArr) => {
    return new Promise((resolve, reject) => {
        UserModel
        .aggregate(aggregateArr)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}