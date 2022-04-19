const DomainCtrl = require("../domainLayer/DomainCtrl.js");
import Pin from "../domainLayer/classes/Pin"; //elimnar fake

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
 * @param {String} type ["24hours", "week", "month", "year"]
 * @param {Float} latitude
 * @param {Float} longitude
 * @returns [{AIR QUALITY},{POLLUTANTS}] => [{title, tags, levels}, {¿?}]
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
			data[1] = await this.domainCtrl.getPollutantsQuantLastWeek(
				latitude,
				longitude
			);
			break;
		case "month":
			data[0] = await this.domainCtrl.getPollutionLevelLastMonth(
				latitude,
				longitude
			);
			data[1] = await this.domainCtrl.getPollutantsQuantLastMonth(
				latitude,
				longitude
			);
			break;
		case "year":
			data[0] = await this.domainCtrl.getPollutionLevelLastYear(
				latitude,
				longitude
			);
			data[1] = await this.domainCtrl.getPollutantsQuantLastYear(
				latitude,
				longitude
			);
			break;
	}
	return data;
};

/**
 *
 * @param {*} name
 * @param {*} location
 * @param {*} description
 * @param {*} media
 * @param {*} rating
 * @param {*} status
 * @returns the created pin
 */
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

/**
 *
 * @param {*} name
 * @param {*} location
 * @param {*} description
 * @param {*} media
 * @param {*} rating
 * @param {*} status
 * @returns the updated pin
 */
PresentationCtrl.prototype.editPin = function (
	name,
	location,
	description,
	media,
	rating,
	status
) {
	return this.domainCtrl.editPin(
		name,
		location,
		description,
		media,
		rating,
		status
	);
};

/**
 *
 * @param {*} username
 * @param {*} email
 * @param {*} points
 * @param {*} healthState
 * @param {*} profilePicture
 * @returns the updated user
 */
PresentationCtrl.prototype.updateUser = function (
	username,
	email,
	points,
	healthState,
	profilePicture
) {
	return this.domainCtrl.updateUser(
		username,
		email,
		points,
		healthState,
		profilePicture
	);
};

PresentationCtrl.prototype.fetchPins = async function () {
	//fake
	const fakePins = [
		new Pin(
			"FIB UPC",
			{
				latitude: 41.38941,
				longitude: 2.113436,
				title:
					"Edifici B6 del Campus Nord, C/ Jordi Girona, 1-3, 08034 Barcelona",
			},
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit leo non vehicula consequat. Etiam lorem ",
			[
				"https://fisica.upc.edu/ca/graus/centres-i-estudis/imatges-escoles/fib.jpeg/@@images/image.jpeg",
				"https://pbs.twimg.com/media/Eh3E26xXYAITese.jpg",
			],
			5,
			"03/04/2022",
			"Public"
		),
		new Pin(
			"PALAU REIAL",
			{
				latitude: 41.38941,
				longitude: 2.113436,
				title: "Av. Diagonal, 686, 08034 Barcelona",
			},
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit leo non vehicula consequat. Etiam lorem ",
			[
				"https://www.bcncatfilmcommission.com/sites/default/files/styles/fancybox/public/locations/Districte%20(3).jpg",
			],
			4.5,
			"11/04/2022",
			"Private"
		),
		new Pin(
			"CAMP NOU",
			{
				latitude: 41.38941,
				longitude: 2.113436,
				title: "C. d'Arístides Maillol, 12, 08028 Barcelona",
			},
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit leo non vehicula consequat. Etiam lorem ",
			["https://cdn.getyourguide.com/img/tour/5cd031d5654c4.jpeg/148.jpg"],
			4,
			"09/04/2022",
			"Public"
		),
		new Pin(
			"CAMP NOUu",
			{
				latitude: 41.38941,
				longitude: 2.113436,
				title: "C. d'Arístides Maillol, 12, 08028 Barcelona",
			},
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit leo non vehicula consequat. Etiam lorem ",
			["https://cdn.getyourguide.com/img/tour/5cd031d5654c4.jpeg/148.jpg"],
			5,
			"10/04/2022",
			"Private"
		),
		new Pin(
			"CAMP NOUuu",
			{
				latitude: 41.38941,
				longitude: 2.113436,
				title: "C. d'Arístides Maillol, 12, 08028 Barcelona",
			},
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit leo non vehicula consequat. Etiam lorem ",
			["https://cdn.getyourguide.com/img/tour/5cd031d5654c4.jpeg/148.jpg"],
			2,
			"11/03/2022",
			"Public"
		),
		new Pin(
			"CAMP NOUuuu",
			{
				latitude: 41.38941,
				longitude: 2.113436,
				title: "C. d'Arístides Maillol, 12, 08028 Barcelona",
			},
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit leo non vehicula consequat. Etiam lorem ",
			["https://cdn.getyourguide.com/img/tour/5cd031d5654c4.jpeg/148.jpg"],
			1,
			"12/04/2022",
			"Public"
		),
	];
	return fakePins;
};

PresentationCtrl.prototype.getMapData = async function () {
	return this.domainCtrl.getMapData();
};

module.exports = PresentationCtrl;
