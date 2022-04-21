const UserModel = require('./../models/user.model')

exports.createUser = async (params) => {
    console.log(params);
    return new Promise((resolve, reject) => {
        console.log(params);
        UserModel
        .create(params)
        .then((data) => { 
            console.log("Creat!: ", data);
            resolve(data) })
        .catch((error) => { reject(error) })
    })
}


exports.findUser = async (where = {}) => {
    return new Promise((resolve, reject) => {
        console.log("where", where);
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