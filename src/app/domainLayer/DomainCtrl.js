const DataPointMap = require("./classes/DataPointMap.js");
const fetch = require("node-fetch");

import Pin from "./classes/Pin";
import User from "./classes/User";

const DadesObertes = require("./services/DadesObertes");
const MeasureStation = require("./classes/MeasureStation");
const dadesObertes = new DadesObertes();

const PersistenceCtrl = require("../persistenceLayer/PersistenceCtrl");
//initialize the persistence ctrl singleton
const persistenceCtrl = new PersistenceCtrl();

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
 * @param {*} title
 * @param {*} location
 * @param {*} description
 * @param {*} media
 * @param {*} rating
 * @param {*} date
 * @param {*} status
 * @returns the created pin in case of success. Otherwise an error message.
 */
DomainCtrl.prototype.createPin = async function (
  title,
  location,
  description,
  media,
  rating,
  date,
  status
) {
  let {latitude, longitude} = location;
  let pin = new Pin(title, latitude, longitude, description, media, rating, new Date(date), status);
  //store db
  let params = {
    title: pin.title,
    description: pin.description,
    latitude: pin.latitude,
    longitude: pin.longitude,
    date: pin.date,
    rating: pin.rating,
    status: pin.status,
    //TODO: creator email. Should get it from the context (auth token when login)
    media: pin.media, 
  }
  let response = await persistenceCtrl.postRequest("/newPin", params);
  if (response.status == 200) {
    return response.data;   // Returns the object inserted in the DB
  } else {
    //TODO: handle error. Return an error and reload the view with the error
  }
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
  let myUser = new User(email, password);
  return await myUser.login(); //login to db
};

//Return the conversation with the id parameter.

/*
 To update:

  1. We dont have the function for logged user, so atm the first user in the array is the logged and the second the conversant
  2. We need to check if the id is and mongoDB id. If the id doesnt exists we return empty object.
  3. Dont have the Images ATM

*/
DomainCtrl.prototype.fetchConversation = async function (id = null) {
  //create
  DB_URL = "http://localhost:7000/v1/conversation?_id=" + id;
  var conver = [];
  var users = {};
  let conversation = await fetch(DB_URL).then((response) => response.json());

  if (conversation.status === 200) {
    const logged = await this.findUser(conversation.data.users[0]);
    const conversant = await this.findUser(conversation.data.users[1]);

    users = {
      logged: {
        id: logged.data._id,
        name: logged.data.name,
        profileImage: "null",
      },
      conversant: {
        id: conversant.data._id,
        name: conversant.data.name,
        profileImage: "null",
      },
    };

    const messages = conversation.data.messages;
    for(mes in messages){
      const message = await this.findMessage(messages[mes]);
      conver.push({
        id: message.data._id,
        user: message.data.user,
        text: message.data.text,
        date: message.data.updatedAt,
      });
    }
   
  }
  return { users:  users, messages: conver };
};

/*
 To update:

  1. We dont have the function for logged user, so atm the first user in the array is the logged and the second the conversant
  2. Need the messages boolean to know if the messages are unread or not. 
  3. Dont have the Images ATM

*/


DomainCtrl.prototype.fetchConversations = async function () {
  //create
  DB_URL = "http://localhost:7000/v1/conversation";
  var conver = [];
  var users = {};
  let conversations = await fetch(DB_URL).then((response) => response.json());

  
  for(var conversation in conversations.data){
   const current_conver = conversations.data[conversation];
    const logged = 	await this.findUser(current_conver.users[0]);
    const conversant = await this.findUser(current_conver.users[1])
    let index_lastMessage = 0;
    if((current_conver.messages.length - 1) > 0) index_lastMessage = current_conver.messages.length - 1
    const lastMessage = await this.findMessage(current_conver.messages[index_lastMessage])
    conver.push({
      id: current_conver._id,
      name: conversant.data.name,
      profileImage: "null",
      lastMessage: lastMessage.data.text,
      lastMessageTime: lastMessage.data.updatedAt,
      unreadMessages: 3
    })
    
  }
  return conver;
};


DomainCtrl.prototype.fetchNewConversations = async function () {
  //create
 const all_users = await this.findUsers();

 const fetchedNewConversations = [];
 all_users.data.forEach(user => {
   fetchedNewConversations.push({
    id: user._id,
    name: user.name,
    profileImage: "null"
  })
 });

  
  return fetchedNewConversations;
};


DomainCtrl.prototype.findUsers = async function () {
  //create
  DB_URL = "http://localhost:7000/v1/user";

  let users = await fetch(DB_URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": " application/json",
      "X-Api-Key":
        "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
    },
  })
    .then((response) => response.json())
    .then((data) => data);

  return users;
};

DomainCtrl.prototype.findUser = async function (email) {
  //create
  DB_URL = "http://localhost:7000/v1/user?email=" + email;

  let user = await fetch(DB_URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": " application/json",
      "X-Api-Key":
        "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
    },
  })
    .then((response) => response.json())
    .then((data) => data);

  return user;
  console.log(user);
};

DomainCtrl.prototype.findMessage = async function (id) {
  //create
  DB_URL = "http://localhost:7000/v1/message?_id=" + id;

  let message = await fetch(DB_URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": " application/json",
      "X-Api-Key":
        "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
    },
  })
    .then((response) => response.json())
    .then((data) => data);
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
