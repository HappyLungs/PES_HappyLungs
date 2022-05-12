
const User = require("../User");
const DatabaseCtrl = require("./DatabaseCtrl");
require("dotenv").config();


let UserCtrl;
(function() {
    let instance;
    UserCtrl = function() {
        if (instance) return instance;
        instance = this;

        // initialize any properties of the singleton
        this.db = new DatabaseCtrl();
        this.usersType = ["all", "blocked"];
    };
}());

// Declare controller methods

UserCtrl.prototype.fetchUsers = async function(type) {
    if (!this.types.includes(type)) throw TypeError("Type of submissions is not supported.");
    return [];
}

module.exports = UserCtrl;