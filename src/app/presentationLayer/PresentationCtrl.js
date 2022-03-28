const DomainCtrl = require("../domainLayer/DomainCtrl.js");

let PresentationCtrl;
(function () {
	let instance;
	PresentationCtrl = function () {
		if (instance) return instance;
		instance = this;

		// initialize any properties of the singleton
		this.domainCtrl = new DomainCtrl();
		return instance;
	};
})();

/**
 *
 * getPollution Level
 *
 * @returns { levels, tags, title, filter }
 */
PresentationCtrl.prototype.getPollutionLastDay = async function () {
	let data = await this.domainCtrl.getPollutionLastDay(41.363094, 2.112971);
	return data; //[1,2,2,2,2,3,3,3,3,4,3,3];
};

/**
 *
 * getPollutants' Quantity
 *
 * @returns { levels, tags, title, filter }
 */
PresentationCtrl.prototype.getPollutantsQuantLastDay = async function () {
	let data = await this.domainCtrl.getPollutantsQuantLastDay(
		41.363094,
		2.112971
	);
	return data;
};

/**
 *
 * @param {*} type ["24hours", "week", "month", "year"]
 * @param {*} latitude
 * @param {*} longitude
 * @returns [{AIR QUALITY},{POLLUTANTS}]
 */
PresentationCtrl.prototype.getDataStatistics = async function (
	type,
	latitude,
	longitude
) {
	let data = new Array();

	switch (type) {
		case "24hours":
			data[0] = await this.domainCtrl.getPollutionLevelLastDay(
				latitude,
				longitude
			);
			data[1] = await this.domainCtrl.getPollutantsQuantLastDay(
				latitude,
				longitude
			);
			break;
		case "week":
			data[0] = await this.domainCtrl.getPollutionLevelLastWeek(
				latitude,
				longitude
			);
			data[1] = await this.domainCtrl.x(latitude, longitude);
			break;
		case "month":
			data[0] = await this.domainCtrl.x(latitude, longitude);
			data[1] = await this.domainCtrl.x(latitude, longitude);
			break;
		case "year":
			data[0] = await this.domainCtrl.x(latitude, longitude);
			data[1] = await this.domainCtrl.x(latitude, longitude);
			break;
	}

	return data;
};

PresentationCtrl.prototype.createPin = function (
	name,
	location,
	description,
	media,
	rating,
	status
) {
	return this.domainCtrl.createPin(
		name,
		location,
		description,
		media,
		rating,
		status
	);
};

PresentationCtrl.prototype.getMapData = async function () {
	return this.domainCtrl.getMapData();
};

module.exports = PresentationCtrl;
