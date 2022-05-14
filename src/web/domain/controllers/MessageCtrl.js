
const Message = require("../Message");
const DatabaseCtrl = require("./DatabaseCtrl");
require("dotenv").config();

let MessageCtrl;
(function() {
    let instance;
    MessageCtrl = function() {
        if (instance) return instance;
        instance = this;

        // initialize any properties of the singleton
        this.db = new DatabaseCtrl();       
    };
}());

// Declare controller methods

//[GET] reported messages
MessageCtrl.prototype.fetchMessages = async function(id) {
    //DB get reported messages from user with email = id
    let messagesData = await this.db.getRequest("/listReportedMessages", {email: id});
    let userData = await this.db.getRequest("/user", {email: id});
    let result = {};
    let messages = [];
    if (messagesData.status === 200 && userData.status === 200) {
        for (let message of messagesData.data) {
            let state = "";
            if (message.state === -2) state = "accepted";
            else if (message.state === -1) state = "declined";
            else state = "pending";
            let date = new Date(message.createdAt);
            let messageObj = new Message({id: message._id, email: message.user, reportantUsername: message.reportantUsername, text: message.text, state: state, date: date.getDate(), hour: date.getHours});
            messages.push(messageObj);
        }
        result.messages = messages;
        result.user = {
            username: user.data.name,
            email: user.data.email,
            picture: user.data.profilePicture
        };
        return result;
    } else return [];
}

//[PUT] accept reported message
MessageCtrl.prototype.acceptReportedMessage = async function(id) {
    //DB accept message with id = id
}

//[PUT] decline reported message
MessageCtrl.prototype.declineReportedMessage = async function(id) {
    //DB declina message with id = id
}


module.exports = MessageCtrl;