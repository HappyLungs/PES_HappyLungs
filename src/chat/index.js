const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 8000;

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("message", (message) => {
        console.log(message);
        io.emit("message", message);
    });
});

server.listen(port, () => console.log("server running on port:"+port))