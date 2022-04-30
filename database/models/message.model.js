
// create message schema
const MessageSchema = new global.Schema({
    text: String,
    user:  {
        type: Schema.ObjectId,
        required: true
    },
    conversation: {
        type: Schema.ObjectId,
        required: true
    },
    image: {
        String,
        default: null
    },
    readed: {
        type: Boolean,
        defalt: false
    },
}, {
    timestamps: true
});
  
  const Messages = global.mongoose.model("Message", MessageSchema);
  module.exports = Messages;