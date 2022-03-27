import Chart from "./Chart.js"

export default class ChartPollutants extends Chart {
    constructor (title) {
        super(title);
        this.pollutants;
        this.quantities;
    }
}