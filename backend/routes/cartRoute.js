const express = require("express");
const asyncHandler = require("../errorHandle/wrapAsync");
const {
  addCart,
  featchCartItems,
  decreCartItems,
  deleteCartItem,
} = require("../controllers/cartController");
const { userMiddleware } = require("../middleware");
let router = express.Router();

router.post("/new", userMiddleware, asyncHandler(addCart));
router.get("/", userMiddleware, featchCartItems);
router.put("/update", userMiddleware, asyncHandler(decreCartItems));
router.delete("/delete", userMiddleware, asyncHandler(deleteCartItem));

module.exports = router;
