import Chart from "./Chart.js"

export default class ChartAirQuality extends Chart {
    constructor (title,tags,levels) {
        super(title);
        this.tags=tags;
        this.levels=levels;
    }
}