const { Server } = require("socket.io");
const { createServer } = require("http");
const express = require("express");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"]
  }
});

const socketAndUserMap = {};

const getSocketId = (userId) => {
  return socketAndUserMap[userId];
};

console.log(socketAndUserMap);

io.on("connection", (socket) => {
  if (socket.handshake.query.userId !== "undefined") {
    socketAndUserMap[socket.handshake.query.userId] = socket.id;
  }

  io.emit("onlineusers", Object.keys(socketAndUserMap));

  socket.on("typing", (obj) => {
    io.to(socketAndUserMap[obj.typeFor]).emit("isTyping", obj.whoType);
  });

  socket.on("disconnect", () => {
    delete socketAndUserMap[socket.handshake.query.userId];
    io.emit("onlineusers", Object.keys(socketAndUserMap));
  });
});

module.exports = {
  app,
  io,
  server,
  getSocketId
};
