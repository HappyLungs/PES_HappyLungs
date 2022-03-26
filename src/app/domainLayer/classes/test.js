const MeasureStation = require("./MeasureStation");


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




/*
let m = new MeasureStation("08019004");

let date="2022-03-03T00:00:00.000";
let d = m.getWeekLevel(date)
console.log(d)
*/