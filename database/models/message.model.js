
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
    reported: {
        type: Number,   //-1 => Reportat + acceptat x administrador, 0 => Reportat però declinat x admin, 1 => Reportat (però no gestionat)
        default: false
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