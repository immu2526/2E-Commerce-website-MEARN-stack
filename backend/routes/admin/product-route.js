const {
  handelImageUpload,
  product,
  featchAllProduct,
  deleteAllProduct,
  editProduct,
  featchSingle,
} = require("../../controllers/admin/product");
const { upload } = require("../../helper/cloudinary");
const asyncHandler = require("../../errorHandle/wrapAsync");
const express = require("express");
let router = express.Router();

router.post(
  "/image-upload",
  upload.single("my_file"),
  asyncHandler(handelImageUpload)
);

router.post("/new/product", asyncHandler(product));
router.get("/", asyncHandler(featchAllProduct));
router.delete("/:id/delete", asyncHandler(deleteAllProduct));
router.put("/:id", asyncHandler(editProduct));
router.post("/:id/single", asyncHandler(featchSingle));

module.exports = router;
