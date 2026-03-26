const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

function connectDB() {
  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => console.log(err));
}

module.exports = connectDB;
