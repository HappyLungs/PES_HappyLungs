//import LevelCalculator from "./LevelCalculator"

require ("LevelCalculator");

let c = new LevelCalculator()

let p = new Map()
p.set("O3",83)
p.set("CO", 0.6)
p.set("NO", 14)

console.log(c.calculateLevelHour(p))