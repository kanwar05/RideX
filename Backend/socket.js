const socketIO = require("socket.io");
const userModel = require("./models/userModels");
const captainModel = require("./models/captainModel");

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

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (userType == "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType == "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      // Support both old format (ltd) and new format (lat)
      const lat = location?.lat !== undefined ? location.lat : location?.ltd;
      const lng = location?.lng;

      // Validate location data
      if (!location || typeof lat !== "number" || typeof lng !== "number") {
        console.error("Invalid location data received:", data);
        socket.emit("error", { message: "Invalid location data" });
        return;
      }

      // Convert to GeoJSON format
      const geoLocation = {
        type: "Point",
        coordinates: [lng, lat], // [longitude, latitude]
      };

      await captainModel.findByIdAndUpdate(userId, { location: geoLocation });

      // console.log("Captain location updated:", {
      //   userId,
      //   location: geoLocation,
      // });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

const sendMessageToSocketId = (socketId, eventName, message) => {
  if (io) {
    console.log(`📤 Sending "${eventName}" to socket ${socketId}`);
    io.to(socketId).emit(eventName, message);
  } else {
    console.log("Socket.io not initialized");
  }
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
