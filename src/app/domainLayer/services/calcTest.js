import DataPointMapRegister from "../classes/DataPointMap.js"



//console.log(c.calculateLevelHour(p))

let punto_random = new DataPointMapRegister(41.389211,2.113400, "2022-03-21T00:00:00.000");
let x = await punto_random.nearerPoints() ;
console.log(x[0]);
//x[0] devuelve el mas cercano
//[[distance, object][distance,object]]