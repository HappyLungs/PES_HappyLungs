const UserModel = require('./../models/user.model')

exports.create = async (params) => {
    console.log(params);
    return new Promise((resolve, reject) => {
        console.log(params);
        UserModel
        .create(params)
        .then((data) => { 
            console.log("Created!: ", data);
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
