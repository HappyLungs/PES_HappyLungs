// create pollutantDayMeasure schema
const PollutantDayMeasureSchema = new global.Schema({
    date: {
        type: Date
    },
    pollutant: String,
    units: String,
    MeasureStation: {
        type: Schema.Types.ObjectId,
        ref: "MeasureStation"
    },
    measures: {
        type: [],
        default: [
            {
                hour: "00", 
                quantity: 0
            }, {
                hour: "01", 
                quantity: 0
            }, {
                hour: "02", 
                quantity: 0
            }, {
                hour: "03", 
                quantity: 0
            }, {
                hour: "04", 
                quantity: 0
            }, {
                hour: "05", 
                quantity: 0
            }, {
                hour: "06", 
                quantity: 0
            }, {
                hour: "07", 
                quantity: 0
            }, {
                hour: "08", 
                quantity: 0
            }, {
                hour: "09", 
                quantity: 0
            }, {
                hour: "10", 
                quantity: 0
            }, {
                hour: "11", 
                quantity: 0
            }, {
                hour: "12", 
                quantity: 0
            }, {
                hour: "13", 
                quantity: 0
            }, {
                hour: "14", 
                quantity: 0
            }, {
                hour: "15", 
                quantity: 0
            }, {
                hour: "16", 
                quantity: 0
            }, {
                hour: "17", 
                quantity: 0
            }, {
                hour: "18", 
                quantity: 0
            }, {
                hour: "19", 
                quantity: 0
            }, {
                hour: "20", 
                quantity: 0
            }, {
                hour: "21", 
                quantity: 0
            }, {
                hour: "22", 
                quantity: 0
            }, {
                hour: "23", 
                quantity: 0
            }, {
                hour: "24", 
                quantity: 0
            }
        ]
    }
});

const PollutantDayMeasure = global.mongoose.model("PollutantDayMeasure", PollutantDayMeasureSchema);
module.exports = PollutantDayMeasure;