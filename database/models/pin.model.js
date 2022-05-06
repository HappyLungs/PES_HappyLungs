// create pin schema
const PinSchema = new global.Schema({
    title: String,
    description: String,
    latitude: Number,
    longitude: Number,
    locationTitle: String,
    date: {
        type: Date,
        default: null
    },
    rating: {
        type: Number,
        enum: [0,1,2,3,4,5]
    },
    status: {
        type: String,
        enum: ["Public","Private"]
    },
    creatorEmail: {
        type: String,
        ref: "user"
    },
    media: {
        type: [],
        default: []
    }
}, {
    timestamps: true
});
  
const Pin = global.mongoose.model("Pin", PinSchema);
module.exports = Pin;