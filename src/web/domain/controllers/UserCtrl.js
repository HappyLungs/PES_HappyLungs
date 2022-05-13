
const User = require("../User");
const DatabaseCtrl = require("./DatabaseCtrl");
require("dotenv").config();

let users =  [
    new User({
        username: "Júlia Herrera Caba",
        email: "juliaherreracaba@gmail.com",
        blocked: false,
        pins: 50,
        ranking: 1,
        chats: 10,
        reported: 0
    }),
    new User({
        username: "Iván Jimeno Ramírez",
        email: "ivan.jimeno.ramirez@gmail.com",
        blocked: false,
        pins: 40,
        ranking: 2,
        chats: 15,
        reported: 2
    }),
    new User({
        username: "Pol València Luque",
        email: "pol.valencia@gmail.com",
        blocked: true,
        pins: 40,
        ranking: 2,
        chats: 15,
        reported: 20
    }),
    new User({
        username: "Carlos",
        email: "carlos@gmail.com",
        blocked: true,
        pins: 12,
        ranking: 2,
        chats: 15,
        reported: 14
    }),
    new User({
        username: "Ricard",
        email: "pol.valencia@gmail.com",
        blocked: false,
        pins: 15,
        ranking: 8,
        chats: 15,
        reported: 13
    })
];

let UserCtrl;
(function() {
    let instance;
    UserCtrl = function() {
        if (instance) return instance;
        instance = this;

        // initialize any properties of the singleton
        this.db = new DatabaseCtrl();
        this.usersType = ["all", "blocked", "reported"];
        
    };
}());

// Declare controller methods

//[GET] users
UserCtrl.prototype.fetchUsers = async function(type) {
    if (!this.types.includes(type)) throw TypeError("Type of submissions is not supported.");
    //DB get users of type = type
    return users;
}

//[GET] reported messages
UserCtrl.prototype.fetchReportedMessages = async function(user) {
    if (!this.types.includes(type)) throw TypeError("Type of submissions is not supported.");
    //DB get users of type = type
    let messages = [];
    return messages;
}

//[PUT] block user
UserCtrl.prototype.blockUser = async function(user) {
    //DB block user
    return dbResponse;
}

//[PUT] unblock user
UserCtrl.prototype.unblockUser = async function(user) {
    //DB unblock user
    return dbResponse;
}

//[PUT] accept reported message
UserCtrl.prototype.acceptReport = async function(messageId) {
    //DB unblock user
    return dbResponse;
}

//[PUT] decline reported message
UserCtrl.prototype.declineReport = async function(messageId) {
    //DB unblock user
    return dbResponse;
}

module.exports = UserCtrl;