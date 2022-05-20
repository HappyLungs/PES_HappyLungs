const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 8000;

io.on("connection", socket => {
    console.log("a user connected :D, id -> ", socket.id);
    
    socket.on("chat message", info => {
      console.log("Message: ", info.message);
      console.log("To: ", info.to)
      //io.to(msg.conversation).emit("chat message", msg);
      io.emit("chat message", info.message);
    });

    console.log("Id: ",socket.handshake.query.id);
    //let converId = socket.handshake.query.id;
    //socket.join(converId);
});

server.listen(port, () => console.log("server running on port:" + port));