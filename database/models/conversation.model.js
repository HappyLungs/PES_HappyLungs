// create message schema
const ConverSchema = new global.Schema({
    user1: {
        type: String,
        required: true
    },
    user2: {    
        type: String,
        required: true
    },
}, {
    timestamps: true
});
  
  const Conversations = global.mongoose.model("Conversation", ConverSchema);
  module.exports = Conversations;