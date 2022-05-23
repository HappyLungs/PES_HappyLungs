const DomainCtrl = require("../domainLayer/DomainCtrl.js");
import i18n from "../config/translation";

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

PresentationCtrl.prototype.getPollutionLevelLastHour = async function (
	latitude,
	longitude
) {
	let data = await this.domainCtrl.getPollutionLevelLastHour(
		latitude,
		longitude
	);
	return data;
};

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
 * @param {*} locationTitle
 * @param {*} description
 * @param {*} media
 * @param {*} rating
 * @param {*} status
 * @returns the created pin
 *
 */
PresentationCtrl.prototype.createPin = async function (
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
	return this.domainCtrl.createPin(
		title,
		location,
		locationTitle,
		description,
		media,
		rating,
		status,
		creatorEmail,
		creatorName
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
	return this.domainCtrl.editPin(
		id,
		title,
		location,
		locationTitle,
		description,
		media,
		rating,
		status,
		userEmail
	);
};

/**
 *
 * @param {*} pin
 * @returns the saved pin from the logged user
 */
PresentationCtrl.prototype.savePin = async function (pin, email) {
	let result = await this.domainCtrl.savePin(pin, email);
	if (result != null) {
		return result;
	} else {
		//TODO: Handle error
		return null;
	}
};

/**
 *
 * @param {*} pin
 * @returns the saved pin from the logged user that is going to be unsaved
 */
PresentationCtrl.prototype.unsavePin = async function (pin, email) {
	let result = await this.domainCtrl.unsavePin(pin, email);
	if (result != null) {
		return result;
	} else {
		//TODO: Handle error
		return null;
	}
};

/**
 *
 * @param {*} pin
 * @returns deletes pin with identifier = id. Else returns null => error
 */
PresentationCtrl.prototype.deletePin = function (pin) {
	return this.domainCtrl.deletePin(pin);
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
PresentationCtrl.prototype.registerUser = async function (
	name,
	email,
	password,
	confirmPassword,
	birthdate
) {
	if (name && email && password && confirmPassword && birthdate) {
		if (password.length > 5) {
			return await this.domainCtrl.registerUser(
				name,
				email,
				password,
				confirmPassword,
				birthdate
			);
		} else {
			return {
				data: {},
				message: i18n.t("signUpError1"),
				status: 502,
			};
		}
	} else {
		return { data: {}, message: i18n.t("signInError1"), status: 422 };
	}
};

/**
 *
 * @param {*} email
 * @param {*} password
 * @returns an acces_token for the user
 */
PresentationCtrl.prototype.loginUser = async function (email, password) {
	if (email && password) {
		return await this.domainCtrl.loginUser(email, password);
	} else {
		return { data: {}, message: i18n.t("signInError1"), status: 422 };
	}
};

/**
 *
 * @param {*} userGoogleData
 * @returns if is registered returns the userInfo, else, registers it and returns the info
 */
PresentationCtrl.prototype.loginGoogleUser = async function (userGoogleData) {
	if (userGoogleData.email) {
		return await this.domainCtrl.loginGoogleUser(userGoogleData);
	} else {
		return { data: {}, message: i18n.t("signInError1"), status: 422 };
	}
};

/**
 *
 * @param {*} email
 * @param {*} oldPassword
 * @param {*} newPassword
 * @returns an acces_token for the user
 */
PresentationCtrl.prototype.changePassword = async function (
	email,
	oldPassword,
	newPassword
) {
	if (email && oldPassword && newPassword) {
		return await this.domainCtrl.changePassword(
			email,
			oldPassword,
			newPassword
		);
	} else {
		return { data: {}, message: i18n.t("signInError1"), status: 422 };
	}
};

/**
 *
 * @param {*} email
 * @returns restores the password and sends an email
 */
PresentationCtrl.prototype.restorePassword = async function (email) {
	if (email) {
		return await this.domainCtrl.restorePassword(email);
	} else {
		return { data: {}, message: i18n.t("signInError1"), status: 422 };
	}
};

/**
 *
 * @param {*} email
 * @returns deletes the user from DB
 */
PresentationCtrl.prototype.deleteUser = async function (email) {
	if (email) {
		return await this.domainCtrl.deleteUser(email);
	} else {
		return { data: {}, message: "deleteError", status: 422 }; // TODO: return { data: {}, message: i18n.t("deleteError"), status: 422 };
	}
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
PresentationCtrl.prototype.updateUser = async function (
	name,
	email,
	points,
	language,
	healthStatus,
	notifications,
	profilePicture
) {
	let userUpdated = await this.domainCtrl.updateUser(
		name,
		email,
		points,
		language,
		healthStatus,
		notifications,
		profilePicture
	);
	return userUpdated.data;
};

/** TODO */

/**
 *
 * @param {*} email
 * @param {*} password
 * @returns the updated user with its new password
 */
PresentationCtrl.prototype.updateUserPassword = async function (
	email,
	password
) {
	let userUpdated = await this.domainCtrl.updateUserPassword(email, password);
	return userUpdated.data;
};

PresentationCtrl.prototype.fetchPins = async function (email) {
	let pins = await this.domainCtrl.fetchPins(email);
	if (pins != null) {
		return pins;
	} else {
		//TODO ERROR: print error && reload page
		return null;
	}
};

PresentationCtrl.prototype.fetchRanking = async function () {
	let ranking = await this.domainCtrl.fetchRanking();
	if (ranking != null) {
		return ranking;
	} else {
		//TODO ERROR: print error && reload page
		return null;
	}
};

PresentationCtrl.prototype.fetchTrendingPins = async function (email) {
	let pins = await this.domainCtrl.fetchTrendingPins(email);
	if (pins != null) {
		return pins;
	} else {
		//TODO ERROR: print error && reload page
		return null;
	}
};

PresentationCtrl.prototype.getQualifationMap = async function (
	range_1,
	range_2
) {
	let energyMap = await this.domainCtrl.getQualifationMap(range_1, range_2);
	if (energyMap != null) {
		return energyMap;
	} else {
		//TODO ERROR: print error && reload page
		return null;
	}
};

PresentationCtrl.prototype.getMapData = async function () {
	return this.domainCtrl.getMapData();
};
PresentationCtrl.prototype.getHeatPoints = async function () {
	return this.domainCtrl.getHeatPoints();
};

PresentationCtrl.prototype.fetchConversations = async function (email) {
	let conversations = await this.domainCtrl.fetchConversations(email);
	if (conversations != null) {
		return conversations;
	} else {
		//TODO ERROR: print error && reload page
		return null;
	}
};

PresentationCtrl.prototype.fetchNewConversations = async function (email) {
	let conversation = await this.domainCtrl.fetchNewConversations(email);
	if (conversation != null) {
		return conversation;
	} else {
		//TODO ERROR: Show error message && reload page
		return null;
	}
};

PresentationCtrl.prototype.fetchConversation = async function (id, email) {
	let conversation = await this.domainCtrl.fetchConversation(id, email);
	if (conversation != null) {
		let { users, messages } = conversation;
		return { users: users, messages: messages };
	} else {
		//TODO ERROR: Show error message && reload page
		return null;
	}
};

PresentationCtrl.prototype.createConversation = async function (
	email,
	text,
	loggedEmail
) {
	let result = await this.domainCtrl.createConversation(
		email,
		text,
		loggedEmail
	);
	if (result != "error") {
		return result;
	} else {
		//TODO ERROR: Show error message && reload page
		return "error";
	}
};

PresentationCtrl.prototype.deleteConversation = async function (id, email) {
	let result = await this.domainCtrl.deleteConversation(id, email);
	if (result != null) {
		return true;
	} else {
		//TODO ERROR: Show error message && reload page
		return false;
	}
};

PresentationCtrl.prototype.createMessage = async function (id, text, email) {
	let newMessage = await this.domainCtrl.createMessage(id, text, email);
	if (newMessage != null) {
		return newMessage;
	} else {
		//TODO ERROR: Show error message && reload page
		return null;
	}
};

PresentationCtrl.prototype.reportMessage = async function (id) {
	try {
		let result = await this.domainCtrl.reportMessage(id);
		return true;
	} catch (error) {
		return false;
	}
};

PresentationCtrl.prototype.createEvent = async function (date, pin, email) {
	this.domainCtrl.createEvent(date, pin, email);
};

PresentationCtrl.prototype.fetchUsers = async function () {
	this.domainCtrl.fetchUsers();
};

PresentationCtrl.prototype.fetchMessage = async function (converId, email) {
	let dbMessages = await this.domainCtrl.fetchMessage(converId, email);
	if (dbMessages != null) {
		return true;
	} else return false;
};

PresentationCtrl.prototype.fetchUser = async function (email) {
	let user = await this.domainCtrl.fetchUser(email);
	if (user != null) {
		return user;
	} else {
		//TODO ERROR: Show error message && reload page
		return null;
	}
};

module.exports = PresentationCtrl;
