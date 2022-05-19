const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 8000;

io.on("connection", socket => {
    console.log("a user connected :D");
    socket.on("chat message", msg => {
      console.log(msg);
      io.emit("chat message", msg);
    });

    console.log("Id: ",socket.handshake.query.id);
    //let converId = socket.handshake.query.id;
    //socket.join(converId);
});

server.listen(port, () => console.log("server running on port:" + port));