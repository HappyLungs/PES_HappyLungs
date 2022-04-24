// create message schema
const ConverSchema = new global.Schema({
    messages: [{type: mongoose.Types.ObjectId}],
    users: [{type: mongoose.Types.ObjectId}],
}, {
    timestamps: true
});
  
  const Conversations = global.mongoose.model("Conversation", ConverSchema);
  module.exports = Conversations;