import DataPointMap from "../../src/app/domainLayer/classes/DataPointMap";
import Article from "../../src/app/domainLayer/classes/Article"


async function post (req, res) {
    const article = new Article("Titulo de prueba", "3333333");
    res.send(article);
};

export {post}