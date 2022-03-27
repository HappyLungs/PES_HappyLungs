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
 * getPollutin 
 * 
 * @returns { levels, tags, title, filter } 
 */
PresentationCtrl.prototype.getPollutionLastDay = async function () {
    let data = await this.domainCtrl.getPollutionLastDay(41.363094, 2.112971)
    return data; //[1,2,2,2,2,3,3,3,3,4,3,3];
}

/**
 * 
 * @param {*} type ["24hours", "week", "month", "year"]
 * @param {*} latitude 
 * @param {*} length 
 * @returns [{AIR QUALITY},{POLLUTANTS}]
 */
 PresentationCtrl.prototype.getLevelStatistics = async function (type,latitude, length) {

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