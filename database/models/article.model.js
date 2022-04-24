// create article schema
const ArticleSchema = new global.Schema({
    id: String,
    user_id: String,
    title: String,
    /*
    Faltaría comments  y Date ++
    */
}); 
  const Article = global.mongoose.model("Article", ArticleSchema);
  module.exports = Article;