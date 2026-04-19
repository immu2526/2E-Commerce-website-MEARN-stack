const customError = require("../errorHandle/customeError");
const bcrypt = require("bcryptjs");
const jwtweb = require("jsonwebtoken");
const User = require("../models/userschema");

// register

const registerUser = async (req, res) => {
  console.log(req.body);

  let { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new customError(400, "All field are require");
  }

  const hashPassword = await bcrypt.hash(password, 12);

  const mongo = new User({
    userName: username,
    email,
    password: hashPassword,
  });

  await mongo.save();

  console.log(mongo);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: mongo,
  });
};

// login

const userLogin = async (req, res) => {
  let { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    throw new customError(400, "All field require");
  }

  let mongo = await User.findOne({ email });

  if (!mongo) {
    throw new customError(404, "user doesn't exist");
  }

  const isMatch = await bcrypt.compare(password, mongo.password);

  if (!isMatch) {
    throw new customError(401, "Enter the vailed Password");
  }

  const token = jwtweb.sign(
    {
      id: mongo._id,
      role: mongo.role,
      email: mongo.email,
      userName: mongo.userName,
    },
    "CLIENT_SECRET_KEY",
    { expiresIn: "7d" }
  );
  console.log(token);

  res.cookie("token", token, { httpOnly: true, secure: false }).json({
    success: true,
    message: "Logged in Successfully",
    user: {
      email: mongo.email,
      role: mongo.role,
      id: mongo._id,
    },
  });
};

// logout

const logOut = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
  });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = { registerUser, userLogin, logOut };
