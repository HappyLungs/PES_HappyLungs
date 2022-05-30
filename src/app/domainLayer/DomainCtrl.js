const DataPointMap = require("./classes/DataPointMap.js");
import { googleCalendarEventUrl } from "google-calendar-url";
import * as Linking from "expo-linking";

//const fetch = require("node-fetch");

import Pin from "./classes/Pin";
import User from "./classes/User";

const DadesObertes = require("./services/DadesObertes");
const MeasureStation = require("./classes/MeasureStation");
const dadesObertes = new DadesObertes();
const dataPointMap = require("./classes/DataPointMap");

const PersistenceCtrl = require("../persistenceLayer/PersistenceCtrl");
//initialize the persistence ctrl singleton
const persistenceCtrl = new PersistenceCtrl();
let lastCoords = [[-1, -1, -1, -1], -1];
let lastHeatpoints = [
	{
		latitude: -1,
		longitude: -1,
		weight: 0,
	},
];

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
		let auxstation = this.getMeasureStation(eoiCode);
		if (!measureStations.has(eoiCode)) {
			let ms;
			if (auxstation === undefined) {
				ms = new MeasureStation(
					measure.codi_eoi,
					measure.nom_estacio,
					measure.tipus_estacio,
					measure.latitud,
					measure.longitud,
					null
				);
			} else ms = auxstation.station;
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
				weight: parseFloat(level) / 5,
			};
			measureStationLevels.push(info);
		}
	}
	return measureStationLevels;
};
DomainCtrl.prototype.getLatLongbyZoom = function (cz, camera) {
	const deltaLat = 540 / Math.pow(2, camera.zoom);
	const inilat = camera.center.latitude - deltaLat;
	const maxlat = camera.center.latitude + deltaLat;
	const deltaLong = 411 / Math.pow(2, camera.zoom);
	const inilong = camera.center.longitude - deltaLong;
	const maxlong = camera.center.longitude + deltaLong;
	return [inilat, inilong, maxlat, maxlong];
};
DomainCtrl.prototype.getIniLatbyCamera = function (cz, camera) {
	if (cz === -1)
		return [[40.514714, -0.116867, 42.814019, 3.20592], 25];
	if (cz < 15) {
		const coords = this.getLatLongbyZoom(cz, camera);
		return [coords, 40];
	}
	return [[-1, -1, -1, -1], -1];
};
DomainCtrl.prototype.getHeatPoints = async function (cz, camera) {
	let datapoints = [];
	const date = new Date();
	const coords = this.getIniLatbyCamera(cz, camera);
	const inilat = coords[0][0];
	const inilong = coords[0][1];
	const maxlat = coords[0][2];
	const maxlong = coords[0][3];
	const nsteps = coords[1];
	lastCoords = coords;
	if (inilat === -1) {
		const actual = {
			latitude: inilat,
			longitude: inilat,
			weight: 0,
		};
		datapoints.push(actual);
		return datapoints;
	}
	let actuallat = inilat;
	let actuallong = inilong;
	const nstepsLong = nsteps / 1.45;
	const nstepsLat = nsteps * 1.25;
	let longstep = (maxlong - inilong) / nstepsLong;
	let latsteps = (maxlat - inilat) / nstepsLat;

	for (let i = 0; i < nstepsLat; i++) {
		for (let j = 0; j < nstepsLong; j++) {
			if (!this.inCat(actuallat, actuallong)) {
				actuallong = actuallong + longstep;
			} else {
				let dp = new DataPointMap(actuallat, actuallong);
				const actual = {
					latitude: actuallat,
					longitude: actuallong,
					weight: (await dp.getHourLevel(date, date.getHours())) / 5,
				};
				datapoints.push(actual);
				actuallong = actuallong + longstep;
			}
		}
		actuallat = actuallat + latsteps;
		actuallong = inilong;
	}
	let actual = {
		latitude: -60,
		longitude: 0,
		weight: 0.99,
	};
	datapoints.push(actual);
	lastHeatpoints = datapoints;
	return datapoints;
};

DomainCtrl.prototype.fetchRanking = async function () {
	let ranking = await persistenceCtrl.getRequest("/listUsers", { type: "all" });
	if (ranking != null) {
		return ranking;
	} else {
		//TODO ERROR: print error && reload page
		return null;
	}
};

DomainCtrl.prototype.initMeasureStations = async function () {
	const date = new Date();
	const dObertes = new DadesObertes();
	let measuresStations = await dObertes.getMeasuresDate(date);
	for (element of measuresStations) {
		if (this.getMeasureStation(element.codi_eoi) === undefined) {
			const m_s = new MeasureStation(
				element.codi_eoi,
				null,
				"heatmap",
				element.latitud,
				element.longitud,
				null
			);

			await m_s.getHourLevel(date, date.getHours());
		}
	}
	//console.log(MeasureStation.Stations.length);
};

/**
 * Calculates pollution level last hour of one point
 * @param {} latitude
 * @param {*} longitude
 */
DomainCtrl.prototype.getPollutionLevelLastHour = async function (
	latitude,
	longitude
) {
	let dp = new DataPointMap(latitude, longitude);
	let date = new Date();
	let level = await dp.getHourLevel(date, date.getHours());
	return level;
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
 * @param {*} title
 * @param {*} location
 * @param {*} description
 * @param {*} media
 * @param {*} rating
 * @param {*} status
 * @returns the created pin in case of success. Otherwise an error message.
 */
DomainCtrl.prototype.createPin = async function (
	title,
	location,
	locationTitle,
	description,
	media,
	rating,
	status,
	creatorEmail,
	creatorName
) {
	let { latitude, longitude } = location;
	let pin = new Pin(
		title,
		latitude,
		longitude,
		locationTitle,
		description,
		media,
		rating,
		status,
		creatorEmail,
		creatorName
	);
	//store db
	let params = {
		title: pin.title,
		description: pin.description,
		latitude: pin.latitude,
		longitude: pin.longitude,
		locationTitle: pin.locationTitle,
		rating: pin.rating,
		status: pin.status,
		creatorEmail: creatorEmail,
		creatorName: creatorName,
		media: pin.media,
	};
	let response = await persistenceCtrl.postRequest("/newPin", params);
	if (response.status === 200) {
		return response.data; // Returns the object inserted in the DB
	} else {
		//TODO: handle error. Return an error and reload the view with the error
	}
};

/**
 * @param {*} email Email from the current logged user
 * @returns pins of logged user. Else returns null => error
 */
DomainCtrl.prototype.fetchPins = async function (email) {
	let result = await persistenceCtrl.getRequest("/pins", {
		user: email,
	});
	if (result.status === 200) {
		return result.data;
	} else {
		//TODO: handle error. Return an error and reload the view with the error
		return null;
	}
};

/**
 * @param {*} email Email from the current logged user
 * @returns returns 50 best rated pins. Else returns null => error
 */
DomainCtrl.prototype.fetchTrendingPins = async function (email) {
	let result = await persistenceCtrl.getRequest("/pins", { email: email });
	if (result.status === 200) {
		return result.data;
	} else {
		//TODO: handle error. Return an error and reload the view with the error
		return null;
	}
};

/**
 *
 * @param {*} Pin
 * @returns the updated pin. Else returns null => error
 */
DomainCtrl.prototype.editPin = async function (
	id,
	title,
	location,
	locationTitle,
	description,
	media,
	rating,
	status,
	userEmail
) {
	let { latitude, longitude } = location;
	let pin = {
		_id: id,
		title: title,
		latitude: latitude,
		longitude: longitude,
		locationTitle: locationTitle,
		description: description,
		media: media,
		rating: rating,
		status: status,
	};
	let result = await persistenceCtrl.putRequest("/pin", {
		pin: pin,
		creatorEmail: userEmail,
	});
	if (result.status === 200) {
		return result.data;
	} else {
		//TODO: handle error. Return an error and reload the view with the error
		return null;
	}
};

/**
 *
 * @param {*} Pin
 * @param {*} email
 * @returns if the Pin have been saved to the user identified by the email "email". Else returns null => error
 */
DomainCtrl.prototype.savePin = async function (pin, email) {
	let result = await persistenceCtrl.putRequest("/savePin", {
		email: email,
		pin: pin,
	});
	if (result.status === 200) {
		return result.data;
	} else {
		//TODO: handle error. Return an error and reload the view with the error
		return null;
	}
};
/**
 *
 * @param {*} Pin
 * @param {*} email
 * @returns if the Pin have been saved to the user identified by the email "email". Else returns null => error
 */
DomainCtrl.prototype.unsavePin = async function (pin, email) {
	let result = await persistenceCtrl.putRequest("/unsavePin", {
		email: email,
		pin: pin,
	});
	if (result.status === 200) {
		return result.data;
	} else {
		//TODO: handle error. Return an error and reload the view with the error
		return null;
	}
};

/**
 *
 * @param {*} id
 * @returns deletes pin with identifier = id. Else returns null => error
 */
DomainCtrl.prototype.deletePin = async function (Pin) {
	let result = await persistenceCtrl.postRequest("/deletePin", {
		_id: Pin._id,
	});
	if (result.status === 200) {
		return result.data;
	} else {
		//TODO: handle error. Return an error and reload the view with the error
		return null;
	}
};

DomainCtrl.prototype.createEvent = function (date, Pin, email) {
	const dateYear = date.slice(6, 10);
	const dateMonth = date.slice(3, 5);
	const dateDay = date.slice(0, 2);

	const DateCalendar = dateYear + dateMonth + dateDay;

	const isoStrStart = DateCalendar + "T100000Z";
	const isoStrEnd = DateCalendar + "T100000Z";

	var url = googleCalendarEventUrl({
		title: Pin.title,
		location: Pin.locationTitle,
		details: Pin.description,
		start: isoStrStart.replace(/-/gi, ""),
		end: isoStrEnd.replace(/-/gi, ""),
	});

	url = url.replace(/\s/g, "+");
	Linking.openURL(url);
};

//USERS

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
	let myUser = new User(name, email, password, birthdate);
	return await myUser.register(confirmPassword); //register to db
};

/**
 *
 * @param {*} email
 * @param {*} password
 * @returns an acces_token for the user
 */

DomainCtrl.prototype.loginUser = async function (email, password) {
	//create
	let myUser = new User(null, email, password, null);
	return await myUser.login(); //login to db
};

/**
 *
 * @param {*} userGoogleData
 * @returns if is registered returns the userInfo, else, registers it and returns the info
 */
DomainCtrl.prototype.loginGoogleUser = async function (userGoogleData) {
	//create
	let myUser = new User(null, userGoogleData.email, null, null);
	return await myUser.loginGoogle(userGoogleData); //login to db
};

/**
 *
 * @param {*} email
 * @param {*} oldPassword
 * @param {*} newPassword
 * @returns an acces_token for the user
 */
DomainCtrl.prototype.changePassword = async function (
	email,
	oldPassword,
	newPassword
) {
	let myUser = new User(null, email, null, null);
	return await myUser.changePassword(oldPassword, newPassword);
};

/**
 *
 * @param {*} email
 * @returns restores the password and sends an email
 */
DomainCtrl.prototype.restorePassword = async function (email) {
	let myUser = new User(null, email, null, null);
	return await myUser.restorePassword();
};

/**
 *
 * @param {*} email
 * @returns an acces_token for the user
 */

DomainCtrl.prototype.deleteUser = async function (email, password) {
	let myUser = new User(null, email, null, null);
	return await myUser.delete();
};

/**
 * @param {*} name
 * @param {*} email
 * @param {*} points
 * @param {*} healthState
 * @param {*} notifications
 * @param {*} profilePicture
 * @returns the updated user
 */
DomainCtrl.prototype.updateUser = async function (
	name,
	email,
	points,
	language,
	healthStatus,
	notifications,
	profilePicture
) {
	let myUser = new User(null, email, null, null);
	//update to db
	return await myUser.update(
		name,
		points,
		language,
		healthStatus,
		notifications,
		profilePicture
	);
};

/** TODO */

/**
 *
 * @param {*} name
 * @param {*} password
 * @returns the updated user with its new password
 */
DomainCtrl.prototype.updateUserPassword = async function (name, password) {
	let myUser = new User(null, email, null, null);
	//update to db
	return await myUser.update(name, password);
};

//Return the conversation with the id parameter.

/*
 To update:
  1. We dont have the function for logged user, so atm the first user in the array is the logged and the second the conversant
  2. We need to check if the id is and mongoDB id. If the id doesnt exists we return empty object.
  3. Dont have the Images ATM
*/
DomainCtrl.prototype.fetchConversation = async function (id, email) {
	let conversation = await persistenceCtrl.getRequest("/conversation", {
		_id: id,
		email: email,
	});
	if (conversation.status === 200) {
		var users = {};
		const logged = await persistenceCtrl.getRequest("/user", { email: email });
		if (logged.status === 200) {
			const conversant = await persistenceCtrl.getRequest("/user", {
				email:
					conversation.data.users[0] === logged.data.email
						? conversation.data.users[1]
						: conversation.data.users[0],
			});
			if (conversant.status === 200) {
				users = {
					logged: {
						email: logged.data.email,
						name: logged.data.name,
						profileImage: logged.data.profilePicture
							? logged.data.profilePicture
							: "null",
					},
					conversant: {
						id: conversant.data._id,
						email: conversant.data.email,
						name: conversant.data.name,
						profileImage: conversant.data.profilePicture
							? conversant.data.profilePicture
							: "null",
					},
				};
				let dbMessages = await persistenceCtrl.getRequest("/message", {
					conversation: conversation.data._id,
					user: email,
				});
				dbMessages.data.forEach((message) => {
					let date = new Date(message.createdAt);
					message.date = [
						date.getDate().toString().padStart(2, "0"),
						(date.getMonth() + 1).toString().padStart(2, "0"),
						date.getFullYear().toString().substring(2),
					].join("/");
					message.hour =
						date.getHours().toString().padStart(2, "0") +
						":" +
						date.getMinutes().toString().padStart(2, "0");
				});
				if (dbMessages.status === 200) {
					return { users: users, messages: dbMessages.data };
				} else {
					//TODO handle error
					return null;
				}
			} else {
				//TODO: handle error
				return null;
			}
		} else {
			//TODO: handle error
			return null;
		}
	} else {
		//TODO: handle error. Return an error and reload the view with the error
		return null;
	}
};

/*
 To update:
  1. We dont have the function for logged user, so atm the first user in the array is the logged and the second the conversant
  2. Need the messages boolean to know if the messages are unread or not.
  3. Dont have the Images ATM
*/

DomainCtrl.prototype.fetchConversations = async function (email) {
	let conver = [];
	let conversations = await persistenceCtrl.getRequest("/conversation", {
		email: email,
	});
	if (conversations.status === 200) {
		for (const current_conver of conversations.data) {
			const conversant = await persistenceCtrl.getRequest("/user", {
				email:
					current_conver.users[0] === email
						? current_conver.users[1]
						: current_conver.users[0],
			});
			if (conversant.status === 200) {
				const lastMessage = await persistenceCtrl.getRequest("/lastMessage", {
					conversation: current_conver._id,
				});
				if (lastMessage.status === 200) {
					if (Array.isArray(lastMessage.data))
						lastMessage.data = lastMessage.data[0];
					const unreadMessages = await persistenceCtrl.getRequest(
						"/unreadedMessages",
						{ conversation: current_conver._id, email: email }
					);
					let date = new Date(lastMessage.data.createdAt);
					if (unreadMessages.status === 200) {
						conver.push({
							id: current_conver._id,
							name: conversant.data.name,
							profileImage: conversant.data.profilePicture
								? conversant.data.profilePicture
								: "https://www.congresodelasemfyc.com/assets/imgs/default/default-logo.jpg",
							lastMessage: lastMessage.data.text,
							lastMessageTime:
								[
									date.getDate().toString().padStart(2, "0"),
									(date.getMonth() + 1).toString().padStart(2, "0"),
									date.getFullYear().toString().substring(2),
								].join("/") +
								" " +
								date.getHours().toString().padStart(2, "0") +
								":" +
								date.getMinutes().toString().padStart(2, "0"),
							unreadMessages:
								unreadMessages.data.length === 0
									? 0
									: unreadMessages.data[0].total,
							lastMessageDate: lastMessage.data.createdAt,
						});
						let i = 0;
					} else {
						//TODO handle error searching for the unread messages
						return null;
					}
				} else {
					//TODO handle error searching for the unread messages
					return null;
				}
			} else {
				//TODO handle error searching for the last message
				return null;
			}
		}
		conver.sort(function (a, b) {
			return new Date(b.lastMessageDate) - new Date(a.lastMessageDate);
		});
		return conver;
	} else {
		//TODO handle error
		return null;
	}
};

DomainCtrl.prototype.fetchNewConversations = async function (email) {
	//get all users with no conversation with logged user
	const all_users = await persistenceCtrl.getRequest("/users", {
		email: email,
	});
	if (all_users.status === 200) {
		const fetchedNewConversations = [];
		all_users.data.forEach((user) => {
			fetchedNewConversations.push({
				email: user.email,
				name: user.name,
				profileImage:
					user.profilePicture !== undefined && user.profilePicture !== ""
						? user.profilePicture
						: "https://www.congresodelasemfyc.com/assets/imgs/default/default-logo.jpg",
			});
		});
		return fetchedNewConversations;
	} else {
		//TODO handle error. Return an error and reload the view with the error
		return null;
	}
};

DomainCtrl.prototype.createConversation = async function (
	email,
	text,
	loggedEmail
) {
	let users = [loggedEmail, email];
	let messages = await persistenceCtrl.postRequest("/conversation", {
		users: users,
		message: text,
	});
	if (messages.status === 200) {
		let message = messages.data;
		let date = new Date(message.createdAt);
		message.date = [
			date.getDate().toString().padStart(2, "0"),
			(date.getMonth() + 1).toString().padStart(2, "0"),
			date.getFullYear().toString().substring(2),
		].join("/");
		message.hour =
			date.getHours().toString().padStart(2, "0") +
			":" +
			date.getMinutes().toString().padStart(2, "0");
		return message.conversation;
	} else {
		//TODO handle error
		return "error";
	}
};

DomainCtrl.prototype.deleteConversation = async function (
	conversationId,
	email
) {
	let result = await persistenceCtrl.postRequest("/deleteConversation", {
		id: conversationId,
		user: email,
	});
	if (result.status === 200) {
		return true;
	} else {
		//TODO handle error
		return false;
	}
};

DomainCtrl.prototype.getQualifationMap = async function (range_1, range_2) {
	const energyMap = await persistenceCtrl.getQualifationMap(range_1, range_2);
	if (energyMap) {
		return energyMap;
	} else {
		//TODO: handle error. Return an error and reload the view with the error
		return null;
	}
};

DomainCtrl.prototype.createMessage = async function (
	conversation,
	text,
	email
) {
	let message = await persistenceCtrl.postRequest("/message", {
		conversation: conversation,
		user: email,
		text: text,
	});
	if (message.status === 200) {
		message = message.data;
		let date = new Date(message.createdAt);
		message.date = [
			date.getDate().toString().padStart(2, "0"),
			(date.getMonth() + 1).toString().padStart(2, "0"),
			date.getFullYear().toString().substring(2),
		].join("/");
		message.hour =
			date.getHours().toString().padStart(2, "0") +
			":" +
			date.getMinutes().toString().padStart(2, "0");
		return message;
	} else {
		//TODO handle error
		return null;
	}
};

DomainCtrl.prototype.reportMessage = async function (messageId) {
	let message = await persistenceCtrl.putRequest("/reportMessage", {
		message: messageId,
	});
	if (message.status === 200) {
		return message.data;
	} else {
		throw new Error("Error reporting message");
	}
};

DomainCtrl.prototype.findUser = async function (email) {
	//create
	let DB_URL = "http://localhost:7000/v1/user?email=" + email;

	return await fetch(DB_URL, {
		headers: {
			Accept: "application/json",
			"Content-Type": " application/json",
			"X-Api-Key":
				"7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
		},
	})
		.then((response) => response.json())
		.then((data) => data);
};

/*DomainCtrl.prototype.findMessage = async function (id) {
  //create
  let DB_URL = "http://localhost:7000/v1/message?_id=" + id;

  return await fetch(DB_URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": " application/json",
      "X-Api-Key":
          "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
    },
  })
      .then((response) => response.json())
      .then((data) => data);
};*/
DomainCtrl.prototype.inCat = function (lat, long) {
	if (40.541006 <= lat && lat <= 41.147653)
		return 0.197311 <= long && long <= 1.03968;

	if (41.147653 <= lat && lat <= 41.202419)
		return 0.297129 <= long && long <= 1.658984;

	if (41.202419 <= lat && lat <= 41.453135)
		return 0.380587 <= long && long <= 2.26035;

	if (41.453135 <= lat && lat <= 41.516696)
		return 0.344322 < long && long < 2.446748;
	if (41.516696 <= lat && lat <= 41.787774)
		return 0.378409 <= long && long <= 3.004935;

	if (41.787774 <= lat && lat <= 41.835174)
		return 0.407281 <= long && long <= 3.157412;

	if (41.835174 <= lat && lat <= 42.179406)
		return 0.677742 <= long && long <= 3.155225;

	if (42.179406 <= lat && lat <= 42.401692)
		return 0.673662 <= long && long <= 3.313046;

	if (42.401692 <= lat && lat <= 42.717475)
		return 0.642428 <= long && long <= 1.409893;
	return false;
};

DomainCtrl.prototype.fetchMessage = async function (converId, email) {
	let dbMessages = await persistenceCtrl.getRequest("/message", {
		conversation: converId,
		user: email,
	});
	if (dbMessages.status === 200) {
		return true;
	} else return null;
};

DomainCtrl.prototype.fetchUser = async function (email) {
	const user = await persistenceCtrl.getRequest("/user", { email: email });
	if (user.status === 200) {
		return user.data;
	} else {
		//TODO handle error
		return null;
	}
};

DomainCtrl.prototype.fetchUserStats = async function (email) {
	let userStats = await persistenceCtrl.getRequest("/userStats", {
		email: email,
	});
	if (userStats.status === 200) {
		if (!userStats.data.chats) userStats.data.chats = 0;
		if (!userStats.data.pins) userStats.data.pins = 0;

		if (!userStats.data.savedPins) userStats.data.savedPins = 0;
		else userStats.data.savedPins = userStats.data.savedPins.length;

		return userStats.data;
	} else {
		//TODO ERROR: Show error message && reload page
		return null;
	}
};

DomainCtrl.prototype.getMeasureStation = function (eoiCode) {
	if (MeasureStation.Stations !== undefined)
		return MeasureStation.Stations.find((element) => element.eoi === eoiCode);
	return undefined;
};

module.exports = DomainCtrl;
