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
 * 
 */
PresentationCtrl.prototype.createPin = function (
	title,
	location,
	description,
	media,
	rating,
	pinData,
	status
) {
	return this.domainCtrl.createPin(
		title,
		location,
		description,
		media,
		rating,
		pinData,
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
		return await this.domainCtrl.registerUser(
			name,
			email,
			password,
			confirmPassword,
			birthdate
		);
	} else {
		return {"data": {}, "message": "Required parameters missing", "status": 422};
	}
};

/**
 *
 * @param {*} email
 * @param {*} password
 * @returns an acces_token for the user
 */
 PresentationCtrl.prototype.loginUser = async function (
	email,
	password
) {
	if (email && password) {
		return await this.domainCtrl.loginUser(
			email,
			password
		);
	} else {
		return {"data": {}, "message": "Required parameters missing", "status": 422};
	}
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

PresentationCtrl.prototype.fetchConversations = async function () {
	let conversations = await this.domainCtrl.fetchConversations(/** TODO: Pass the email from the logged user */);
	if (conversations != null) {
		return conversations;
	} else {
		//TODO ERROR: print error && reload page
		return null;
	}/* 
	let fakeConvers = [
		{
			id: "1",
			name: "Júlia Herrera",
			profileImage: "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/f/3/5/2/f352b0854c086944629262f2d048416f.jpg",
			lastMessage: "Hola com estas? Jo estic amb el xat",
			lastMessageTime: "10:30",
			unreadMessages: 3			

		},
		{
			id: "2",
			name: "Iván Jimeno",
			profileImage: "https://image.winudf.com/v2/image1/Y29tLmxha25haWRyaWFwcHMucHJvZmlsZV9zY3JlZW5fMl8xNjI2Njc1ODcyXzA1NA/screen-2.jpg?fakeurl=1&type=.jpg",
			lastMessage: "Hola com estas? ",
			lastMessageTime: "22/04/22",
			unreadMessages: 0			

		},
		{
			id: "3",
			name: "Pol Valenciaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
			profileImage: "https://1.bp.blogspot.com/-dtvFFZQ2OTE/YPLdL3iKodI/AAAAAAAAkC8/HuAsGot_sI0QAzp9kqZmxHu6yZwjssOHQCLcBGAsYHQ/s1037/Alone%2BBoy%2BText%2BDP.jpg",
			lastMessage: "Hola com estas? Jo estic amb el xat, jo estic amb el xat, jo estic amb el xat, jo estic amb el xat",
			lastMessageTime: "20/04/22",
			unreadMessages: 5			

		}
	];
	return fakeConvers; */
};

PresentationCtrl.prototype.fetchNewConversations = async function () {
	let conversation = await this.domainCtrl.fetchNewConversations(/** TODO pass the email from the logged user */);
	if (conversation != null) {
		return conversation;
	} else {
		//TODO ERROR: Show error message && reload page
		return null;
	}
	/* let fakeNewConvers = [
		{
			id: "1",
			name: "Júlia Herrera",
			profileImage: "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/f/3/5/2/f352b0854c086944629262f2d048416f.jpg",
		},
		{
			id: "2",
			name: "Iván Jimeno",
			profileImage: "https://image.winudf.com/v2/image1/Y29tLmxha25haWRyaWFwcHMucHJvZmlsZV9zY3JlZW5fMl8xNjI2Njc1ODcyXzA1NA/screen-2.jpg?fakeurl=1&type=.jpg",
		},
		{
			id: "3",
			name: "Pol Valenciaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
			profileImage: "https://1.bp.blogspot.com/-dtvFFZQ2OTE/YPLdL3iKodI/AAAAAAAAkC8/HuAsGot_sI0QAzp9kqZmxHu6yZwjssOHQCLcBGAsYHQ/s1037/Alone%2BBoy%2BText%2BDP.jpg",
		},
		{
			id: "4",
			name: "Júlia Herrera 2",
			profileImage: "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/f/3/5/2/f352b0854c086944629262f2d048416f.jpg",
		},
		{
			id: "5",
			name: "Iván Jimeno 2",
			profileImage: "https://image.winudf.com/v2/image1/Y29tLmxha25haWRyaWFwcHMucHJvZmlsZV9zY3JlZW5fMl8xNjI2Njc1ODcyXzA1NA/screen-2.jpg?fakeurl=1&type=.jpg",
		},
		{
			id: "6",
			name: "Pol Valenciaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa 2",
			profileImage: "https://1.bp.blogspot.com/-dtvFFZQ2OTE/YPLdL3iKodI/AAAAAAAAkC8/HuAsGot_sI0QAzp9kqZmxHu6yZwjssOHQCLcBGAsYHQ/s1037/Alone%2BBoy%2BText%2BDP.jpg",
		}
	];

	return fakeNewConvers; */
};

PresentationCtrl.prototype.fetchConversation = async function (id) {
	let conversation = await this.domainCtrl.fetchConversation(id);
	if (conversation != null) {
		let {users, messages} = conversation;
		return {users: users, messages: messages};
	} else {
		//TODO ERROR: Show error message && reload page
		return null;
	}
	/* 
	let users = {
		logged: {
			id: "2",
			name: "Iván Jimeno",
			profileImage: "https://image.winudf.com/v2/image1/Y29tLmxha25haWRyaWFwcHMucHJvZmlsZV9zY3JlZW5fMl8xNjI2Njc1ODcyXzA1NA/screen-2.jpg?fakeurl=1&type=.jpg",
		},
		conversant: {
			id: "1",
			name: "Júlia Herrera",
			profileImage: "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/f/3/5/2/f352b0854c086944629262f2d048416f.jpg"
		}
	};
	//new Date(year, month, day, hours, minutes, seconds, milliseconds)
	let fakeConver = [
		{
			id: "1",
			user: "1",
			date: "26 april 2022",
			hour: "15:30",
			text: "Hola!"

		},
		{
			id: "2",
			user: "1",
			date: "26 april 2022",
			hour: "15:40",
			text: "Què tal?"
		},
		{
			id: "3",
			user: "2",
			date: "27 april 2022",
			hour: "15:30",
			text: "Molt bé i tu?"
		}
	];
	
	return {users: users, messages: fakeConver}; */
};

PresentationCtrl.prototype.createMessage = async function (id, text) {
	let newMessage = await this.domainCtrl.createMessage(id, text);
	if (newMessage != null) {
		return newMessage;
	} else {
		//TODO ERROR: Show error message && reload page
		return null;
	}
}

module.exports = PresentationCtrl;
