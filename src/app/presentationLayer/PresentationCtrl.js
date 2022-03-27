import { DomainCtrl } from "../domainLayer/DomainCtrl.js"

let PresentationCtrl;
(function () {
    let instance;
    PresentationCtrl = function () {
        if (instance) return instance;
        instance = this;

        // initialize any properties of the singleton
        this.domainCtrl = new DomainCtrl();
    };
}());

/**
 * 
 * getPollution Level
 * 
 * @returns { levels, tags, title, filter } 
 */
PresentationCtrl.prototype.getPollutionLastDay = async function () {
    let data = await this.domainCtrl.getPollutionLastDay(41.363094, 2.112971);
    return data; //[1,2,2,2,2,3,3,3,3,4,3,3];
}

/**
 * 
 * getPollutants' Quantity 
 * 
 * @returns { levels, tags, title, filter } 
 */
 PresentationCtrl.prototype.getPollutantsQuantLastDay = async function () {
    let data = await this.domainCtrl.getPollutantsQuantLastDay(41.363094, 2.112971)
    return data;
}

/**
 * 
 * @param {*} type ["24hours", "week", "month", "year"]
 * @param {*} latitude 
 * @param {*} length 
 * @returns [{AIR QUALITY},{POLLUTANTS}]
 */
 PresentationCtrl.prototype.getDataStatistics = async function (/*type, latitude, length*/) {
    let data = new Array();
    data[0] = await this.domainCtrl.getPollutionLastDay(41.363094, 2.112971);
    data[1] = await this.domainCtrl.getPollutantsQuantLastDay(41.363094, 2.112971);
    return data;
}


PresentationCtrl.prototype.createPin = function (name, location, description, media, rating, status) {
    this.domainCtrl.createPin(name, location, description, media, rating, status);
}

/*
PresentationCtrl.prototype.getPollutionLastDay =  function() {
    //let data = await this.domainCtrl.getPollutionLastDay(41.363094,2.112971,"2022-03-15T00:00:00.000")
    return [1,2,2,2,2,3,3,3,3,4,3,3];
}
*/

export { PresentationCtrl };