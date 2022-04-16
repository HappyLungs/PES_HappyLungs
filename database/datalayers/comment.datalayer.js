const Comment = require("../models/comment.model");


async function createComment (params) {
    return new Promise((resolve, reject) => {
        console.log(params);
        Comment
        .create(params)
        .then((data) => { 
            resolve(data) })
        .catch((error) => { reject(error) })
    })


}

export {createComment}