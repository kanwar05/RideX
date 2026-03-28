const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "Firstname must be of at least 3 characters"],
    },
    lastName: {
      type: String,
      required: true,
      minlength: [3, "Lastname must be of at least 3 characters"],
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Lastname must be of at least 5 characters"],
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

userSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcryptjs.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
