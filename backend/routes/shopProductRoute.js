const { shopProduct, individualPro } = require("../controllers/ShopProduct");
const asyncHandler = require("../errorHandle/wrapAsync");
const express = require("express");
let router = express.Router();

router.get("/", asyncHandler(shopProduct));
router.get("/:id/individual", asyncHandler(individualPro));

module.exports = router;
