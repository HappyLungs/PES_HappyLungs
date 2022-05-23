import io from "socket.io-client";

let Socket;
(function() {
    let instance;
    Socket = function(email) {
        if (instance) return instance;
        instance = this;

        // initialize any properties of the singleton
        this.email = email;
        this.socket = io('http://ec2-15-237-124-151.eu-west-3.compute.amazonaws.com:8000',{query: 'email='+email});
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