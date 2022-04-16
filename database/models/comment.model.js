// create article schema
const CommentSchema = new global.Schema({
    id: String,
    body: String,
    date: Date,
}); 
  const Comment = global.mongoose.model("Comment", CommentSchema);
  module.exports = Comment;