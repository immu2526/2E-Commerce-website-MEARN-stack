const express = require("express");
let router = express.Router();
const asyncHandler = require("../errorHandle/wrapAsync");
const {
  createOrdered,
  capturePayment,
  getAllUserByOrder,
  getOrderDetails,
  allOrder,
} = require("../controllers/order-controller");

router.get("/", asyncHandler(allOrder));
router.post("/create", asyncHandler(createOrdered));
router.post("/capture", asyncHandler(capturePayment));
router.get("/:userId/allorder", asyncHandler(getAllUserByOrder));
router.get("/details/:id", asyncHandler(getOrderDetails));

module.exports = router;
