const {
  createReview,
  allReview,
  deleteReview,
} = require("../controllers/review");
const asyncHandler = require("../errorHandle/wrapAsync");
const express = require("express");
const { userMiddleware } = require("../middleware");
let router = express.Router();

router.post("/:id/review", userMiddleware, asyncHandler(createReview));
router.get("/:id", allReview);
router.delete("/:id", deleteReview);
module.exports = router;
