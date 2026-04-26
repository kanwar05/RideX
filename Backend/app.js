const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./db/mongoDB.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const userRoutes = require("./routes/userRoute.js");
const captainRoutes = require("./routes/captainRoutes.js");
const mapsRoutes = require("./routes/mapsRoutes.js");
const rideRoutes = require("./routes/rideRoutes.js");

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapsRoutes);
app.use('/rides', rideRoutes)

module.exports = app;
