// create message schema
const ConverSchema = new global.Schema({
    messages: [{type: mongoose.Types.ObjectId}],
    users: [{
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ]
    }]
}, {
    timestamps: true
});
  
  const Conversations = global.mongoose.model("Conversation", ConverSchema);
  module.exports = Conversations;