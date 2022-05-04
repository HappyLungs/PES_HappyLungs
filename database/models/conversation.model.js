// create message schema
const ConverSchema = new global.Schema({
    users: [{
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ]
    }],
    deleted: [{
        type: Boolean,
        default: [false, false]
    }]
}, {
    timestamps: true
});
  
  const Conversations = global.mongoose.model("Conversation", ConverSchema);
  module.exports = Conversations;