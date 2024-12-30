const express = require("express");
const app = express();
const User = require("./model/user");
const dsa = require("./dsa/dsa");

// global middleware
app.use(express.json());

console.log(dsa.reverseArray([1, 4, 3, 2, 6, 5, 9]));
console.log(dsa.findMaxMin([3, 5, 4, 1, 9]));
console.log(dsa.findMaxMin([22, 14, 8, 17, 35, 3]));

// post request
app.post("/signUp", async (req, res) => {
  try {
    const user = new User(req.body);
    const data = await user.save();

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

// get request for all users
app.get("/user", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      date: new Date(Date.now()).toLocaleString(),
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
});

// get request for a single user
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id });

    res.status(200).json({
      status: "success",
      results: user.length,
      date: new Date(Date.now()).toLocaleString(),
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
});

// patch request

// put request

// delete request
module.exports = app;
