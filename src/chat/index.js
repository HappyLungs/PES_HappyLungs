const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 8000;
let sockets = new Map();

io.on("connection", socket => {
<<<<<<< HEAD
    console.log("a user connected :D, id -> ", socket.id, socket.handshake.query.email);
=======
    console.log("a user connected :D, socket id -> ", socket.id);
>>>>>>> parent of c1fb669 ( #task 202: conversations)
    
    socket.on("chat message", ({msg, to}) => {
      console.log("Message and to: ", msg, to);
      //io.to(msg.conversation).emit("chat message", msg);
      io.emit("chat message", msg);
    });

    //console.log("Id: ",socket.handshake.query.id);
    //let converId = socket.handshake.query.id;
    //socket.join(converId);
});

server.listen(port, () => console.log("server running on port:" + port));