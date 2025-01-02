const User = require("../model/user");
const jwt = require("jsonwebtoken");
exports.authValidator = async function (req, res, next) {
  try {
    //1. Validate token
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Please login again!");
    }

    // decode jwt
    const decoded = jwt.verify(token, "this is my secret");
    const { _id, iat: issuedAt, exp: expiredAt } = decoded;

    // check expiredAt is greater than issuedAt
    if (issuedAt * 1 > expiredAt * 1) throw new Error("Please login again!");

    // find the user
    const user = await User.findOne({ _id });

    if (!user) {
      throw new Error("No user found with this token!");
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.signUpHandler = async function (req, res) {
  try {
    //1. take input data for signing up
    const user = new User(req.body);
    const data = await user.save();

    data.password = undefined;

    //2. once data save make user logged in by generating token
    const token = user.getJWT();

    //3. sending token as a cookie
    res.cookie("token", token);

    //4. sending response
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
};

exports.allUsersHandler = async function (req, res) {
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
};

exports.userByIdHandler = async function (req, res) {
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
};

exports.deleteUserHandler = async function (req, res) {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);

    res.status(204).json({ status: "success" });
  } catch (error) {
    res.status(501).json({ status: "fail", message: error.message });
  }
};

exports.loginHandler = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Creadiants not found!");
    }

    // 1. find email users.

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("no user found with given email");
    }

    // 2. validate password
    const isValid = await user.valiadtePassword(password, user.password);
    if (!isValid) {
      throw new Error("Credentials not found!");
    }

    // 3. generate jwt token
    const token = user.getJWT();

    // 4. send token as a cookie
    res.cookie("token", token);

    //5. remove password from user;
    user.password = undefined;
    res.status(200).json({
      status: "suceess",
      message: "user logged in",
      user,
    });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error.message });
  }
};
