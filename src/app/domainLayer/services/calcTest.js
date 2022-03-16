import LevelCalculator from "./LevelCalculator.js"

let c = new LevelCalculator()

let p = new Map()
p.set("O3",83)
p.set("CO", 0.6)
p.set("NO2", 4)

console.log(c.calculateLevelHour(p))