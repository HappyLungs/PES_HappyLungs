// create users schema
const UsersSchema = new global.Schema({
    name: String,
    password: String,
    email: String,
    phone: String,
    birthdate: {
        type: Date,
    },
    location: String,
    points: {
        type: Number,
        default: 0
    },
    language: {
        type: String,
        enum: ["Catalan", "Spanish", "English"],
        default: "Catalan"
    },
    healthStatus: {
        type: String,
        enum: ["Pregnant", "Old People", "Respiratory disease", "None"],
        default: "None"
    }
}, {
    timestamps: true
});
  
  const Users = global.mongoose.model("User", UsersSchema);
  module.exports = Users;