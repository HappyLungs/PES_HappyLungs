// create pollutantDayMeasure schema
const PollutantDayMeasureSchema = new global.Schema({
    date: {
        type: Date
    },
    pollutant: {
        type: String,
        enum: ["CO", "NO2", "O3", "PM10", "PM2.5", "SO2"]
    },
    units: String,
    dataPointMap: {
        type: Schema.Types.ObjectId,
        ref: "DataPointMap"
    }
});
const PollutantDayMeasure = global.mongoose.model("PollutantDayMeasure", PollutantDayMeasureSchema);
module.exports = PollutantDayMeasure;