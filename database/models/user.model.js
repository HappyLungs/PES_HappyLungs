const bcrypt=require("bcryptjs");

// create users schema
const UsersSchema = new global.Schema({
    name: String,
    password: {
        type:String,
        required: [true,"Please provide a password"],
        minlength: [6,"Please provide a password with min 6 characters"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match:[
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ]
    },
    birthdate: {
        type: Date,
    },
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
        type: Array,
        default: [false, false, false]
    },
    notifications: {
        type: Boolean,
        default: true
    },
    profilePicture: String,
    savedPins: [{
        type: Schema.Types.ObjectId,
        ref: "Pins"
    }],
    status: {
        type: Number,       //-1 => BLOCKED, 0 => Deleted, 1 => Active user
        default: 1
    },
    reported: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

UsersSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        next();
    }
    bcrypt.genSalt(10,(err,salt) => {
        if (err) next (err);
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) next(err);
            this.password=hash;
            next();
        });
    });
});

  const UserModel = global.mongoose.model("User", UsersSchema);
  module.exports = UserModel;