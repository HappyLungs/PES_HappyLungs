
const User = require("../User");
const DatabaseCtrl = require("./DatabaseCtrl");
require("dotenv").config();

let fakeUsers =  [
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
        picture: "https://cdn.luxe.digital/media/2019/09/12090452/business-professional-dress-code-men-harvey-specter-suit-style-luxe-digital.jpg", 
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
        picture: "https://www.edx.org/static/a43d4bd4e8c372da3ba0b909a508b831/Aprende_microsoft_office.jpg", 
        blocked: false,
        pins: 12,
        ranking: 2,
        chats: 15,
        reported: 0
    }),
    new User({
        username: "Ricard",
        email: "ricard@gmail.com",
        picture: "http://asilasventas.com/wp-content/uploads/2018/11/man-in-office.jpg", 
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
    if (!this.usersType.includes(type)) throw TypeError("Type of submissions is not supported.");
    //DB get users of type = type
    let result = await this.db.getRequest("/listUsers", {type: type});
    let users = [];
    if (result.status === 200) {
        for (let user of result.data) {
            let params = {
                username: user.name,
                email: user.email,
                picture: user.profilePicture,
                blocked: (user.status === -1) ? true : false,
                pins: (user.pins !== undefined) ? user.pins : 0,
                ranking: user.ranking + 1,
                chats: (user.chats !== undefined) ? user.chats : 0,
                reported: user.reported,
            }
            users.push(new User(params));
        }
        return users;
    } else return fakeUsers;
}

//[PUT] block user
UserCtrl.prototype.blockUser = async function(user) {
    //DB block user
    let dbResponse = await this.db.putRequest("/blockUser", {email: user});
    if (dbResponse.status === 200) return true;
    else throw Error("Error blocking user.");
}

//[PUT] unblock user
UserCtrl.prototype.unblockUser = async function(user) {
    //DB unblock user
    let dbResponse = await this.db.putRequest("/blockUser", {email: user});
    if (dbResponse.status === 200) return true;
    else throw Error("Error unblocking user.");
}

module.exports = UserCtrl;