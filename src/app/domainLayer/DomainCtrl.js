import { DataPointMap } from "./classes/DataPointMap.js"
import { Pin } from "./classes/Pin"


let DomainCtrl;
(function () {
    let instance;
    DomainCtrl = function () {
        if (instance) return instance;
        instance = this;

        // initialize any properties of the singleton

    };
}());

DomainCtrl.prototype.getPollutionLastDay = async function (latitude, length, date) {

    let point = new DataPointMap(latitude, length);
    let data = await point.getDayLevel(date);
    let finalData = [];

    for (let i = 1; i <= 24; i += 2) {
        finalData.push(data.get(i));
    }

    return finalData;
}

DomainCtrl.prototype.getPollutionLastWeek = async function (latitude, length, date) {

    let point = new DataPointMap(latitude, length);
    let data = await point.getWeekLevel(date);
    /*
    let finalData = [];

    for (let i = 1; i <= 24; i += 2) {
        finalData.push(data.get(i));
    }
    */

    return data;
}

DomainCtrl.prototype.createPin = function (name, location, description, media, rating, status) {
    let newPin = new Pin(name, location, description, media, rating, status);
    //store db
}



export { DomainCtrl };

