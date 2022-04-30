// create message schema
const ConverSchema = new global.Schema({
    users: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true
});
  
  const Conversations = global.mongoose.model("Conversation", ConverSchema);
  module.exports = Conversations;