const MeasureStation = require("./MeasureStation");

/*
// Start function
const start = async function() {
    const d = "2022-03-15T00:00:00.000";
    const h = 12;

    let m = new MeasureStation("08019004");

    console.log("Crido la funció a test.js")
    const result = await m.getWeekLevel(d);;

    console.log(result);
}

// Call start
start();
*/

/*
const d = "2022-02-01T00:00:00.000";
var day = new Date(d);
console.log(day); // Apr 30 2000

var nextDay = new Date(day);
nextDay.setDate(day.getDate() + 1);
console.log(nextDay); // May 01 2000  
*/
const d = "2022-02-01T00:00:00.000Z";
const today = new Date(d)
console.log(today)

const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() - 1)
console.log(tomorrow)

/*
let m = new MeasureStation("08019004");

let date="2022-03-03T00:00:00.000";
let d = m.getWeekLevel(date)
console.log(d)
*/