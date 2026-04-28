const socketIO = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

const sendMessageToSocketId = (socketId, eventName, message) => {
  if (io) {
    io.to(socketId).emit(eventName, message);
  } else {
    console.log("Socket.io not initialized");
  }
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
