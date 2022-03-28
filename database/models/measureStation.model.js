// create measureStation schema
const MeasureStationSchema = new global.Schema({
    eoiCode: Number,
    stationName: String,
    stationType: String,
    altitude: {
        type: Number,
        default: 0
    },
    latitude: {
        type: Number,
        default: 0
    },
    length: {
        type: Number,
        default: 0
    },
    georeference: [Number]
});
  const MeasureStation = global.mongoose.model("MeasureStation", MeasureStationSchema);
  module.exports = MeasureStation;