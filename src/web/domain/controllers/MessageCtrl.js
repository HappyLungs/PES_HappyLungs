
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
            if (message.reported === -2) state = "accepted";
            else if (message.reported === -1) state = "declined";
            else state = "pending";
            let date = new Date(message.createdAt);
            let messageObj = new Message({id: message._id, email: message.user, reportantUsername: message.reportantUsername, text: message.text, state: state, date: ((date.getDate() < 10) ? "0"+date.getDate() : date.getDate())+"/"+ ((parseInt(date.getMonth())+1 < 10) ? "0" : "") + (parseInt(date.getMonth())+1).toString() +"/"+date.getFullYear(), hour: ((date.getHours() < 10) ? "0"+date.getHours() : date.getHours())+":"+(date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes())});
            messages.push(messageObj);
        }
        result.messages = messages;
        result.user = {
            username: userData.data.name,
            email: userData.data.email,
            picture: userData.data.profilePicture
        };
        return result;
    } else return [];
}

//[POST] accept reported message
MessageCtrl.prototype.acceptReportedMessage = async function(id) {
    //DB accept message with id = id
    let result = await this.db.postRequest("/updateReportedMessage", {messageId: id, reported: -2});
    if (result.status === 200) return true;
    else return false;
}

//[POST] decline reported message
MessageCtrl.prototype.declineReportedMessage = async function(id) {
    //DB declina message with id = id
    let result = await this.db.postRequest("/updateReportedMessage", {messageId: id, reported: -1});
    if (result.status === 200) return true;
    else return false;
}

module.exports = MessageCtrl;