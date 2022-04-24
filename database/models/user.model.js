const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

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
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ]
    },
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