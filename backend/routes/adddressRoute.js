const express = require("express");
const asyncHandler = require("../errorHandle/wrapAsync");
const { userMiddleware } = require("../middleware");
const {
  addAddress,
  featchAddress,
  updateAddress,
  deletAddress,
  findSingle,
} = require("../controllers/AddressController");
let router = express.Router();

router.post("/:userId/new", asyncHandler(addAddress));
router.get("/:userId", asyncHandler(featchAddress));
router.get("/:addressId/edit", asyncHandler(findSingle));
router.put("/:addressId/:userId/update", asyncHandler(updateAddress));
router.delete("/:userId/:productId", asyncHandler(deletAddress));

module.exports = router;
