
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
        type: Number,   //-2 => Reportat + acceptat x administrador, -1 => Reportat però declinat x admin, 0 => No reportat, 1 => Reportat (però no gestionat)
        default: 0
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