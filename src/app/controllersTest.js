import {PresentationCtrl} from "./presentationLayer/PresentationCtrl.js"
import {DomainCtrl} from "./domainLayer/DomainCtrl.js"

let pCtrl = new PresentationCtrl();
let dCtrl = new DomainCtrl();


let data = await pCtrl.getPollutionLastDay();
console.log(data);
