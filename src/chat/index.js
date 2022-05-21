const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 8000;
let sockets = new Map();

io.on("connection", socket => {
    console.log("a user connected :D, id -> ", socket.id, socket.handshake.query.email);
    sockets.set(socket.handshake.query.email, socket.id);
    console.log("sockets -> ", sockets)


    socket.on("chat message", info => {
      console.log("Message and to: ", info.message, info.to, sockets.get(info.to.email));
      //io.to(msg.conversation).emit("chat message", msg);
      io.emit("chat message", msg);
    });
});

server.listen(port, () => console.log("server running on port:" + port));