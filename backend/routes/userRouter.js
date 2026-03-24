const asyncHandler = require("../errorHandle/wrapAsync");
const express = require("express");
let router = express.Router();
let { registerUser, userLogin, logOut } = require("../controllers/user");
const { checkToken } = require("../middleware");

router.post("/register", asyncHandler(registerUser));
router.post("/login", asyncHandler(userLogin));
router.post("/logout", logOut);
router.get("/check-auth", checkToken, (req, res) => {
  const user = req.user;
  console.log(user);
  res.status(200).json({
    success: true,
    message: "Authenticate user !",
    user: user,
  });
});

module.exports = router;
