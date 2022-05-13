
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
    return "messages";
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