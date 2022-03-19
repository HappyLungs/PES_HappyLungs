import {MeasureStation} from "./MeasureStation.js"

let s = new MeasureStation("08019043");
let level = await s.getMeasuresByDay("2022-03-15T00:00:00.000");
console.log(level);