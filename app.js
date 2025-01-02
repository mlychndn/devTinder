const express = require("express");
const cookieParser = require("cookie-parser");
const {
  authValidator,
  signUpHandler,
  allUsersHandler,
  userByIdHandler,
  deleteUserHandler,
  loginHandler,
} = require("./controller/userController");

const app = express();

// global middleware

// json parser global middleware
app.use(express.json());

// cookie parsor global middleware
app.use(cookieParser());

// post request
app.post("/signUp", signUpHandler);

app.post("/login", loginHandler);

// get request for all users

app.get("/user", authValidator, allUsersHandler);

// get request for a single user
app.get("/user/:id", authValidator, userByIdHandler);

// patch request

// put request

// delete request

app.delete("/user/:id", authValidator, deleteUserHandler);
module.exports = app;
