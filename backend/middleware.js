//

const jwtweb = require("jsonwebtoken");
const User = require("./models/userschema");
// autho token middleware
const checkToken = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("this is token", token);

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Unouthorize user",
    });
  }

  try {
    const decoded = jwtweb.decode(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Unouthorize user",
    });
  }
};

//

const userMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("this is token", token);
    if (!token) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const decoded = jwtweb.decode(token, "CLIENT_SECRET_KEY");
    console.log("this is decoded", decoded);

    const user = await User.findById(decoded.id);

    req.user = user; // user attach

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

//

module.exports = { checkToken, userMiddleware };
