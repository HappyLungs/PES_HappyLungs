// create measure schema
const MeasureSchema = new global.Schema({
    hour: {
        enum: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]
    },
    pollutant: {
        enum: ["CO", "NO2", "O3", "PM10", "PM2.5", "SO2"]
    },
    date: {
        type: Date
    },
    quantity: Number,
});
  const Measure = global.mongoose.model("Measure", MeasureSchema);
  module.exports = Measure;
  
