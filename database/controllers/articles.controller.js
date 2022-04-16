import article from "../datalayers/article.datalayer"


async function create (request, response) {
 //   const article = new Article("Titulo de prueba", "3333333");
   // res.send(article);

    let params = {};
    if (request.body.params) {
        params = request.body.params;
    } else {
        responseObj.status  = errorCodes.REQUIRED_PARAMETER_MISSING;
        responseObj.message = "Required parameters missing";
        responseObj.data    = {};
        response.send(responseObj);
        return;
    }
    article.createArticle(params)
    .then((articleData) => {
        console.log(articleData);
        if (articleData !== null && typeof articleData !== undefined) {
            responseObj.status  = errorCodes.SUCCESS;
            responseObj.message = "Success";
            responseObj.data    = articleData;
        } else {
            responseObj.status  = errorCodes.DATA_NOT_FOUND;
            responseObj.message = "No record found";
            responseObj.data    = {};
        }
        response.send(responseObj);
    })
    .catch(error => {
        responseObj.status  = errorCodes.SYNTAX_ERROR;
        responseObj.message = error;
        responseObj.data    = {};
        response.send(responseObj);
    });
    return;


};

export {create}