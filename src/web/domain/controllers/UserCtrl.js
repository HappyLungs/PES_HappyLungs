
const User = require("../User");
//const DatabaseCtrl = require("./DatabaseCtrl");
require("dotenv").config();

let users =  [
    new User({
        username: "Júlia Herrera Caba",
        email: "juliaherreracaba@gmail.com",
        picture: "https://media.istockphoto.com/photos/african-woman-with-resume-picture-id644186760?k=20&m=644186760&s=612x612&w=0&h=og1WeKE4aUPNG73iRUaR0MjqVuIOvZNcZIRHDHEB3uQ=", 
        blocked: false,
        pins: 50,
        ranking: 1,
        chats: 10,
        reported: 0
    }),
    new User({
        username: "Iván Jimeno Ramírez",
        email: "ivan.jimeno.ramirez@gmail.com",
        picture: "https://d1bvpoagx8hqbg.cloudfront.net/originals/how-to-take-a-good-photo-for-your-cv-our-top-tips-e529cea3222e81502875a139a070a9fe.jpg", 
        blocked: false,
        pins: 40,
        ranking: 2,
        chats: 15,
        reported: 0
    }),
    new User({
        username: "Pol València Luque",
        email: "pol.valencia@gmail.com",
        picture: "https://d1bvpoagx8hqbg.cloudfront.net/originals/how-to-take-a-good-photo-for-your-cv-our-top-tips-e529cea3222e81502875a139a070a9fe.jpg", 
        blocked: true,
        pins: 40,
        ranking: 2,
        chats: 15,
        reported: 20
    }),
    new User({
        username: "Carlos",
        email: "carlos@gmail.com",
        picture: "https://d1bvpoagx8hqbg.cloudfront.net/originals/how-to-take-a-good-photo-for-your-cv-our-top-tips-e529cea3222e81502875a139a070a9fe.jpg", 
        blocked: false,
        pins: 12,
        ranking: 2,
        chats: 15,
        reported: 0
    }),
    new User({
        username: "Ricard",
        email: "ricard@gmail.com",
        picture: "", 
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
        //this.db = new DatabaseCtrl();
        this.usersType = ["all", "blocked", "reported"];
        
    };
}());

// Declare controller methods

//[GET] users
UserCtrl.prototype.fetchUsers = async function(type) {
    if (!this.usersType.includes(type)) throw TypeError("Type of submissions is not supported.");
    //DB get users of type = type
    return users;
}

//[GET] reported messages
UserCtrl.prototype.fetchReportedMessages = async function(user) {
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