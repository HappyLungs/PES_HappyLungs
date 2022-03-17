import {MeasureStation} from "./MeasureStation.js"

let s = new MeasureStation("08089005");
let level = await s.getHourLevel("2022-03-16T00:00:00.000", 11);
console.log(level);