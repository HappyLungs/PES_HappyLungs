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
  if (response.status === 200) {
    return response.data;   // Returns the object inserted in the DB
  } else {
    //TODO: handle error. Return an error and reload the view with the error
  }
};

/**
 *
 * @returns pins of logged user. Else returns null => error
 */
DomainCtrl.prototype.fetchPins  = async function () {
  let result = await persistenceCtrl.getRequest("/pins", {user: "ivan.jimeno@estudiantat.upc.edu" /** TODO: Change the user email for the logged one */})
  if (result.status === 200) {
    return result.data;
  } else {
    //TODO: handle error. Return an error and reload the view with the error
    return null;
  }
}

/**
 *
 * @returns returns 50 best rated pins. Else returns null => error
 */
 DomainCtrl.prototype.fetchPins  = async function () {
  let result = await persistenceCtrl.getRequest("/pins", {})
  if (result.status === 200) {
    return result.data;
  } else {
    //TODO: handle error. Return an error and reload the view with the error
    return null;
  }
}

/**
 *
 * @param {*} Pin
 * @returns the updated pin. Else returns null => error
 */
DomainCtrl.prototype.editPin = async function (
    Pin
) {
  let result = await persistenceCtrl.putRequest("/pin", Pin)
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
 * @returns the updated pin. Else returns null => error
 */
 DomainCtrl.prototype.editPin = async function (
  Pin
) {
  let result = await persistenceCtrl.putRequest("/pin", Pin)
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
 DomainCtrl.prototype.deletePin = async function (
  Pin
) {
  let result = await persistenceCtrl.postRequest("/deletePin", {_id: Pin._id})
  if (result.status === 200) {
    return result.data;
  } else {
    //TODO: handle error. Return an error and reload the view with the error
    return null;
  }
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

DomainCtrl.prototype.loginUser = async function (
    email,
    password
) {
  //create
  let myUser = new User(
      null,
      email,
      password,
      null
  );
  return await myUser.login();	//login to db
};

//Return the conversation with the id parameter.

/*
 To update:
  1. We dont have the function for logged user, so atm the first user in the array is the logged and the second the conversant
  2. We need to check if the id is and mongoDB id. If the id doesnt exists we return empty object.
  3. Dont have the Images ATM
*/
DomainCtrl.prototype.fetchConversation = async function (id) {
  let conversation = await persistenceCtrl.getRequest("/conversation", {_id: id});
  if (conversation.status === 200) {
    var users = {};
    const logged = await persistenceCtrl.getRequest("/user", {email: "ivan.jimeno@estudiantat.upc.edu" /** TODO replace with the logged user email */});
    if (logged.status === 200) {
      const conversant = await persistenceCtrl.getRequest("/user", {email: (conversation.data.users[0] === logged.data.email) ? conversation.data.users[1] : conversation.data.users[0]});
      if (conversant.status === 200) {
        users = {
          logged: {
            id: logged.data._id,
            name: logged.data.name,
            profileImage: (logged.data.profilePicture) ? logged.data.profilePicture : "null",
          },
          conversant: {
            id: conversant.data._id,
            name: conversant.data.name,
            profileImage: (conversant.data.profilePicture) ? conversant.data.profilePicture : "null",
          },
        };
        const message = await persistenceCtrl.getRequest("/message", {conversation: conversation.data._id});
        if (message.status === 200) {
          return { users:  users, messages: message.data };
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


DomainCtrl.prototype.fetchConversations = async function () {
  let conver = [];
  let conversations = await persistenceCtrl.getRequest("/conversation", {email: "ivan.jimeno@estudiantat.upc.edu"/** TODO: Pass the logged user email */});
  if (conversations.status === 200) {
    conversations.data.map(async current_conver =>  {
      // const logged = 	await this.findUser(current_conver.users[0]); //No sense to search the user email on the database (data for the logged user is in the context)
      const conversant = await persistenceCtrl.getRequest("/user", {email: (current_conver.users[0] === "ivan.jimeno@estudiantat.upc.edu" /** TODO: Use the logged user email */) ? current_conver.users[1] : current_conver.users[0]});
      if (conversant.status === 200) {
        //let index_lastMessage = 0;
        //if((current_conver.messages.length - 1) > 0) index_lastMessage = current_conver.messages.length - 1
        //const lastMessage = await this.findMessage(current_conver.messages[index_lastMessage])
        const lastMessage = await persistenceCtrl.getRequest("/lastMessage", {conversation: current_conver._id});
        if (lastMessage.status === 200) {
          if (Array.isArray(lastMessage.data)) lastMessage.data = lastMessage.data[0];
          const unreadMessages = await persistenceCtrl.getRequest("/unreadedMessages", {conversation: current_conver._id, email: "ivan.jimeno@estudiantat.upc.edu" /** TODO Pass the logged user email instead */});
          if (unreadMessages.status === 200) {
            conver.push({
              id: current_conver._id,
              name: conversant.data.name,
              profileImage: (conversant.data.profilePicture) ? conversant.data.profilePicture : "null",
              lastMessage: lastMessage.data.text,
              lastMessageTime: lastMessage.data.createdAt,
              unreadMessages: unreadMessages.data.total
            })
          } else {
            //TODO handle error searching for the unread messages
            return null;
          }
        } else {
          //TODO handle error searching for the last message
          return null;
        }
      } else {
        //TODO handle error searching for the specified user
        return null;
      }
    })
    return conver;
  } else {
    //TODO handle error
    return null;
  }
};

DomainCtrl.prototype.fetchNewConversations = async function (email) {
  //get all users with no conversation with logged user
  const all_users = await persistenceCtrl.getRequest("/users", {email: "ivan.jimeno@estudiantat.upc.edu"/*TODO Pass the google id from the logged user */});
  if (all_users.status === 200) {
    const fetchedNewConversations = [];
    all_users.data.forEach(user => {
      fetchedNewConversations.push({
        id: user._id,
        name: user.name,
        profileImage: (user.profilePicture !== undefined && user.profilePicture !== "") ? user.profilePicture : "null"
      })
    });
    return fetchedNewConversations;
  } else {
    //TODO handle error. Return an error and reload the view with the error
    return null;
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
  //console.log(user);
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
  //console.log(user);
};*/

/**
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
  return new User(
      username,
      email,
      points,
      healthState,
      profilePicture
  );
  //update to db
};

module.exports = DomainCtrl;