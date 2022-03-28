// create dataPointMap schema
const DataPointMapSchema = new global.Schema({
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
  const DataPointMap = global.mongoose.model("DataPointMap", DataPointMapSchema);
  module.exports = DataPointMap;