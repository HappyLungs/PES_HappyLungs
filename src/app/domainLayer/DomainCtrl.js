const DataPointMap = require("./classes/DataPointMap.js");
const fetch = require('node-fetch')

import Pin from "./classes/Pin";
import User from "./classes/User";

const DadesObertes = require("./services/DadesObertes");
const MeasureStation = require("./classes/MeasureStation");
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
	allMeasures.forEach((measure) => {
		let eoiCode = measure.codi_eoi;
		if (!measureStations.has(eoiCode)) {
			let ms = new MeasureStation(
				measure.codi_eoi,
				measure.nom_estacio,
				measure.tipus_estacio,
				measure.latitud,
				measure.longitud,
				null
			);
			measureStations.set(eoiCode, ms);
		}
	});

	let measureStationLevels = [];
	for (let [, ms] of measureStations) {
		let level = await ms.getHourLevel(date, date.getHours());
		if (level != null) {
			let info = {
				latitude: parseFloat(ms.latitud),
				longitude: parseFloat(ms.longitud),
				weight: parseFloat(level),
			};
			measureStationLevels.push(info);
		}
	}
	return measureStationLevels;
};

//STATISTICS - AIR QUALITY

/**
 * Calculate the pollution level at every hour of a day in one point
 * @param {Integer} latitude
 * @param {Integer} length
 * @returns
 */
DomainCtrl.prototype.getPollutionLevelLastDay = async function (
	latitude,
	length
) {
	let date = new Date();
	let point = new DataPointMap(latitude, length);
	let data = await point.getDayLevel(date);

	let finalTags = [];
	let finalLevels = [];
	for (let i = 1; i < 24; i += 2) {
		finalTags.push(data.tags[i]);
		finalLevels.push(data.levels[i]);
	}

	data.tags = finalTags;
	data.levels = finalLevels;

	return data;
};

/**
 *
 * @param {*} latitude
 * @param {*} length
 * @returns
 */
DomainCtrl.prototype.getPollutionLevelLastWeek = async function (
	latitude,
	length
) {
	let date = new Date();
	let point = new DataPointMap(latitude, length);
	return await point.getWeekLevel(date);
};

DomainCtrl.prototype.getPollutionLevelLastMonth = async function (
	latitude,
	length
) {
	let date = new Date();
	let point = new DataPointMap(latitude, length);
	let data = await point.getMonthLevel(date);

	let finalTags = [];
	let finalLevels = [];
	for (let i = 0; i <= 30; i += 2) {
		finalTags.push(data.tags[i]);
		finalLevels.push(data.levels[i]);
	}

	data.tags = finalTags;
	data.levels = finalLevels;

	return data;
};

DomainCtrl.prototype.getPollutionLevelLastYear = async function (
	latitude,
	length
) {
	let date = new Date();
	let point = new DataPointMap(latitude, length);
	data.tags = finalTags;
	data.levels = finalLevels;

	return await point.getYearLevel(date);
};

//STATISTICS - POLLUTANTS

DomainCtrl.prototype.getPollutantsQuantLastDay = async function (
	latitude,
	length
) {
	let date = new Date();
	let point = new DataPointMap(latitude, length);
	return await point.getPollutantsQuantDay(date);
};

DomainCtrl.prototype.getPollutantsQuantLastWeek = async function (
	latitude,
	length
) {
	let date = new Date();
	let point = new DataPointMap(latitude, length);
	return await point.getPollutantsQuantWeek(date);
};

DomainCtrl.prototype.getPollutantsQuantLastMonth = async function (
	latitude,
	length
) {
	let date = new Date();
	let point = new DataPointMap(latitude, length);
	return await point.getPollutantsQuantMonth(date);
};

DomainCtrl.prototype.getPollutantsQuantLastYear = async function (
	latitude,
	length
) {
	let date = new Date();
	let point = new DataPointMap(latitude, length);
	return await point.getPollutantsQuantYear(date);
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
DomainCtrl.prototype.createPin = function (
	name,
	location,
	description,
	media,
	rating,
	status
) {
	return new Pin(name, location, description, media, rating, status);
	//store db
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
DomainCtrl.prototype.editPin = function (
	name,
	location,
	description,
	media,
	rating,
	status
) {
	//edit not create
	return new Pin(name, location, description, media, rating, status);
	//store db
};

/**
 *
 * @param {*} name
 * @param {*} email
 * @param {*} password
 * @param {*} confirmPassword
 * @param {*} birthdate
 * @returns message if error
 */
 DomainCtrl.prototype.registerUser = async function (
	name,
	email,
	password,
	confirmPassword,
	birthdate
) {
	//create
	let myUser = new User(
		name,
		email,
		password,
		birthdate
	);
	return await myUser.register(confirmPassword);	//register to db
};

/**
 *
 * @param {*} email
 * @param {*} password
 * @returns an acces_token for the user
 */
 DomainCtrl.prototype.loginUser = async function (
	email,
	password
) {
	//create
	let myUser = new User(
		email,
		password
	);
	return await myUser.login();	//login to db
};


//Devolver todas las conversaciones
DomainCtrl.prototype.fetchConversations = async function () {
	//create
	DB_URL = "http://localhost:7000/v1/conversation"
 var conver = [];
	var users = {}
	let conversations = await fetch(DB_URL)
	.then(response => response.json())
	

	if(conversations.status === 200) {
		for(var conversation in conversations.data){
	
			const logged = 	await this.findUser(conversations.data[conversation].users[0]);
			const conversant = await this.findUser(conversations.data[conversation].users[1])

			 users = {
				logged: {
					id: logged.data._id,
					name: logged.data.name,
					profileImage: "null"
				},
				conversant: {
					id: conversant.data._id,
					name: conversant.data.name,
					profileImage: "null"
				}
			};
			
			const messages = conversation.messages
			const message = await this.findMessage("625ed69da994cd36f441fbe8");
			conver.push({
				id: message.data._id,
				user: message.data.user,
				text: message.data.text,
				date: message.data.updatedAt
			})
		
		
		}

	
		
		

	}
	return ({users: await users, messages: conver})
};

//Devolver todas las conversaciones
DomainCtrl.prototype.findUser = async function (email) {
	//create
	DB_URL = "http://localhost:7000/v1/user?email=" + email

	
	let user = await fetch(DB_URL, {
		headers: {
			'Accept': 'application/json',
					  'Content-Type': ' application/json',
					  'X-Api-Key': '7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm'
				  },
	})
	.then(response => response.json())
	.then(data => data)

	return user;
	console.log(user);
};

DomainCtrl.prototype.findMessage = async function (id) {
	//create
	DB_URL = "http://localhost:7000/v1/message?_id=" + id

	let message = await fetch(DB_URL, {
		headers: {
			'Accept': 'application/json',
					  'Content-Type': ' application/json',
					  'X-Api-Key': '7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm'
				  },
	})
	.then(response => response.json())
	.then(data => data)
	return message;
	console.log(user);
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
DomainCtrl.prototype.updateUser = function (
	username,
	email,
	points,
	healthState,
	profilePicture
) {
	//edit, not create
	let updatedUser = new User(
		username,
		email,
		points,
		healthState,
		profilePicture
	);
	return updatedUser;
	//update to db
};

module.exports = DomainCtrl;
