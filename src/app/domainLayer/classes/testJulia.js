const MeasureStation = require("./MeasureStation");
//const DomainCtrl = require("../DomainCtrl")
//const dCtrl = new DomainCtrl();



// Start function
const start = async function() {
    
    //const d = new Date();
    //const h = 12;
    //let m = new MeasureStation("08019004");
    //console.log("Crido la funció a test.js")
    //const result = await m.getWeekLevel(d);;
    //console.log(result);

   //let x = await dCtrl.getPollutionLevelLastYear(41.363094, 2.112971)
   //let x  = await dCtrl.getPollutionLevelLastDay(41.363094, 2.112971);

   const ms = new MeasureStation("08102005");
   let x = ms.getYearLevel(new Date());

   console.log(x);
}

start();



/*
const d = "2022-02-01T00:00:00.000";
var day = new Date(d);
console.log(day); // Apr 30 2000
var nextDay = new Date(day);
nextDay.setDate(day.getDate() + 1);
console.log(nextDay); // May 01 2000  
*/
/*
const today = new Date()
console.log(today)
const lastweek = new Date(today)
lastweek.setDate(lastweek.getDate() - 7)
console.log(lastweek)
let year = lastweek.getFullYear();
let month = (lastweek.getMonth()+1) < 10 ? "0"+(lastweek.getMonth()+1) : lastweek.getMonth()+1;
let day = lastweek.getDate() < 10 ? "0"+lastweek.getDate() : lastweek.getDate();
const apiDate = year+"-"+month+"-"+day+"T00:00:00.000";
console.log(apiDate)
*/


/*
let m = new MeasureStation("08019004");
let date="2022-03-03T00:00:00.000";
let d = m.getWeekLevel(date)
console.log(d)
*/