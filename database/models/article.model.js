// create article schema
const ArticleSchema = new global.Schema({
    id: String,
    user_id: String,
    title: String,
    /*
    Faltaría comments 
    */
}); 
  const Article = global.mongoose.model("Article", ArticleSchema);
  module.exports = Article;