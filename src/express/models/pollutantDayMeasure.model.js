// create pollutantDayMeasure schema
const PollutantDayMeasureSchema = new global.Schema({
    date: {
        type: Date
    },
    pollutant: String,
    units: String,
    dataPointMap: {
        type: Schema.Types.ObjectId,
        ref: "DataPointMap"
    }
});
const PollutantDayMeasure = global.mongoose.model("PollutantDayMeasure", PollutantDayMeasureSchema);
module.exports = PollutantDayMeasure;