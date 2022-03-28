const DataPointMap = require("./classes/DataPointMap.js");
const Pin = require("./classes/Pin");
const DadesObertes = require("./services/DadesObertes");
const MeasureStation = require("./classes/MeasureStation")
const dadesObertes = new DadesObertes();


let DomainCtrl;
(function () {
	let instance;
	DomainCtrl = function () {
		if (instance) return instance;
		instance = this;

		// initialize any properties of the singleton
	};
})();

//MAP

/**
 * 
 * @returns array with the contamination level of each measure station and its position
 */
 DomainCtrl.prototype.getMapData = async function () {
    let date = new Date();
    let measureStations = new Map();
    let allMeasures = await dadesObertes.getMeasuresDate(date);
    allMeasures.forEach(measure => {
        let eoiCode = measure.codi_eoi;
        if (!measureStations.has(eoiCode)) {
            let ms = new MeasureStation(measure.codi_eoi, measure.nom_estacio, measure.tipus_estacio, measure.latitud, measure.longitud, null);
            measureStations.set(eoiCode,ms);
        }
    });

    let measureStationLevels = [];
    for (let [key, ms] of measureStations) {
        let level = await ms.getHourLevel(date, date.getHours())
		if (level != null) {
			let info = {
				latitude: ms.latitud,
				length: ms.longitud,
				weight: level
			}
			measureStationLevels.push(info)
		}
    }
    return measureStationLevels;
}

//STATISTICS - AIR QUALITY


DomainCtrl.prototype.getPollutionLevelLastDay = async function (latitude, length) {
	let date = new Date();
	let point = new DataPointMap(latitude, length);
	let data = await point.getDayLevel(date);
	
	let finalData = [];
	for (let i = 1; i <= 24; i += 2) {
		finalData.push(data.get(i));
	}

	return finalData;
};

DomainCtrl.prototype.getPollutionLevelLastWeek = async function (latitude, length) {
    let date = new Date();
	let point = new DataPointMap(latitude, length);
    let data = await point.getWeekLevel(date);

    return data;
}

DomainCtrl.prototype.getPollutionLevelLastMonth = async function (latitude, length) {
	let date = new Date();
	let point = new DataPointMap(latitude, length);
	let data = await point.getMonthLevel(date);

	let finalTags = [];
	let finalLevels = [];
	for (let i = 0; i <= 30; i += 2) {
		finalTags.push(data.tags[i]);
		finalLevels.push(data.level[i]);
	}

	data.tags = finalTags;
	data.levels = finalLevels;

	return data;
}

//STATISTICS - POLLUTANTS

DomainCtrl.prototype.getPollutionLastWeek = async function (latitude, length) {
    let point = new DataPointMap(latitude, length);
    let data = await point.getWeekLevel(date);

    return data;
}

DomainCtrl.prototype.getPollutantsQuantLastDay = async function (latitude,length) {
	let date = new Date();
	let point = new DataPointMap(latitude, length);
	let data = await point.getPollutantsQuantDay(date);

	return data;
};

DomainCtrl.prototype.createPin = function (
	name,
	location,
	description,
	media,
	rating,
	status
) {
	let newPin = new Pin(name, location, description, media, rating, status);
	//store db
};

module.exports = DomainCtrl;
