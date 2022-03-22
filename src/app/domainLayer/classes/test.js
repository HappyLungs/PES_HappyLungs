import DataPointMap from "./DataPointMap.js";
import {MeasureStation} from "./MeasureStation.js"
/*
let s = new MeasureStation("08019043");
let level = await s.getMeasuresByDay("2022-03-15T00:00:00.000");
console.log(level);

*/

let s = new DataPointMap(41.363094, 2.112971, "2022-03-15T00:00:00.000" );
let level1 = await s.getLevelByHour("2022-03-15T00:00:00.000", 16);
//let level = await s.getMeasuresByDay("2022-03-15T00:00:00.000");
console.log(level1);

