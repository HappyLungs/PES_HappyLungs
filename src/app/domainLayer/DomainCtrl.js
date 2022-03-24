import {DataPointMap} from "./classes/DataPointMap.js"


let DomainCtrl;
(function() {
    let instance;
    DomainCtrl = function() {
        if (instance) return instance;
        instance = this;

        // initialize any properties of the singleton
        
    };
}());

DomainCtrl.prototype.getPollutionLastDay = async function(latitude, length, date) {

    let point = new DataPointMap(latitude, length);
    let data = await point.getLevelByDay(date);
    let finalData = [];

    for (let i = 1; i <= 24; i+=2) {
        finalData.push(data.get(i));
    }

    return finalData;
}



export {DomainCtrl};

