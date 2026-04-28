const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const captainSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "Firstname must be of at least 3 characters"],
    },
    lastName: {
      type: String,
      minlength: [3, "Lastname must be of at least 3 characters"],
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  socketId: {
    type: String,
  },

  status: {
    type: String,
    enum: ["active", "inActive"],
    default: "active",
  },

  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Vehicle color must be of at least 3 characters"],
    },

    plate: {
      type: String,
      required: true,
      minlength: [3, "Vehicle plate must be of at least 3 characters"],
    },

    capacity: {
      type: Number,
      required: true,
      min: [1, "Vehicle capacity must be a at least 1"],
    },

    vehicleType: {
      type: String,
      enum: ["car", "motorcycle", "auto"],
      required: true,
    },
  },

  location: {
    ltd: {
      type: Number,
    },

    lng: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcryptjs.hash(password, 10);
};

const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;
