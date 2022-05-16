// create message schema
const ConverSchema = new global.Schema({
    users: [{
        type: String,
    }],
    deleted: {
        type: Array,
        default: [false, false]
    }
}, {
    timestamps: true
});
  
  const Conversations = global.mongoose.model("Conversation", ConverSchema);
  module.exports = Conversations;
