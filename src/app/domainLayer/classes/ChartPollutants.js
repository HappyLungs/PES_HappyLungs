import Chart from "./Chart.js"

class ChartPollutants extends Chart{
    constructor (title,pollutants,quantities) {
        super(title);
        this.pollutants=pollutants;
        this.quantities=quantities;

    }
}