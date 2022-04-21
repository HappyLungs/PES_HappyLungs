
// create message schema
const MessageSchema = new global.Schema({
    text: String,
    user: Schema.ObjectId,
}, {
    timestamps: true
});
  
  const Messages = global.mongoose.model("Message", MessageSchema);
  module.exports = Messages;