// create pin schema
const PinSchema = new global.Schema({
    title: String,
    description: String,
    latitude: Number,
    length: Number,
    date: {
        type: Date,
        default: null
    },
    rate: {
        type: Number,
        enum: [0,1,2,3,4,5]
    },
    public: Boolean,
    creatorEmail: {
        type: String,
        ref: "user"
    },
    images: {
        type: [],
        default: []
    }
}, {
    timestamps: true
});
  
const Pin = global.mongoose.model("Pin", PinSchema);
module.exports = Pin;