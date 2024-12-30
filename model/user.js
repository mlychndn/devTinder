const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlen: 3,
    maxlen: 30,
  },
  lastName: {
    type: String,
    maxlen: 30,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: function (input) {
        return `Your email ${input.value} is not valid`;
      },
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: [validator.isStrongPassword, "Password is not strong"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Password confirm is required"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Password and confirm password are not the same!",
    },
    select: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
