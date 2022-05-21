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
      let message = info.message;
      let to = info.to;
      let socketId = sockets.get(to.email);
      console.log("Message and to: ", message, to, socketId);
      //io.to(msg.conversation).emit("chat message", msg);
      if (socketId != undefined) io.to(socketId).emit("chat message", info.message);
    });

    socket.on("new chat", info => {
      let message = info.message;
      let to = info.to;
      let socketId = sockets.get(to.email);
      console.log("New chat -> Message and to: ", message, to, socketId);
      //io.to(msg.conversation).emit("chat message", msg);
      if (socketId != undefined) io.to(socketId).emit("new chat", info.message);
    });

});

server.listen(port, () => console.log("server running on port:" + port));