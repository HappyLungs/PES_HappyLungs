
// create message schema
const MessageSchema = new global.Schema({
    text: String,
    user:  {
        type: String,
        required: true
    },
    conversation: {
        type: Schema.ObjectId,
        required: true
    },
    image: {
        type: String,
        default: null
    },
    readed: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

  const Messages = global.mongoose.model("Message", MessageSchema);
  module.exports = Messages;