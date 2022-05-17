const DomainCtrl = require("./domainLayer/DomainCtrl.js")

let dCtrl = new DomainCtrl();

const data =  dCtrl.getQualifationMap("A", "C").then(res => console.log("s"))
//let data = await pCtrl.getPollutionLastDay();
