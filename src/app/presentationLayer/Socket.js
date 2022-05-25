import io from "socket.io-client";

let Socket;
(function() {
    let instance;
    Socket = function(email) {
        if (instance) return instance;
        instance = this;

        // initialize any properties of the singleton
        this.email = email;
        this.socket = io('http://ec2-54-89-16-250.compute-1.amazonaws.com:8000',{query: 'email='+email});
        this.socket.open();
    };
}());

Socket.prototype.getSocket = function() {
    return this.socket;
}

Socket.prototype.getEmail = function() {
    return this.email;          
}

module.exports = Socket;