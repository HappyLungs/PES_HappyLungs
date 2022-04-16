const Article = require("../models/article.model");


async function createArticle (params) {
    return new Promise((resolve, reject) => {
        console.log(params);
        Article
        .create(params)
        .then((data) => { 
            resolve(data) })
        .catch((error) => { reject(error) })
    })


}
