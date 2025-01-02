const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
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
    gender: {
      type: "string",
      enum: ["male", "female", "others"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      validate: [validator.isStrongPassword, "Password is not strong"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "confirm password is required"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password and confirm password are not the same!",
      },
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
    next();
  } catch (error) {
    console.error(error.message);
  }
});

userSchema.methods.valiadtePassword = async function (reqPassword, dbPassword) {
  const isValid = await bcrypt.compare(reqPassword, dbPassword);
  return isValid;
};

userSchema.methods.getJWT = function () {
  const { _id } = this;
  const token = jwt.sign({ _id }, "this is my secret", { expiresIn: "1d" });
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
