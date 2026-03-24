//

const customeError = require("../../errorHandle/customeError");
const { handleUploadImage } = require("../../helper/cloudinary");
const Product = require("../../models/Product");

let handelImageUpload = async (req, res) => {
  if (!req.file) {
    return res.json({ message: "file not received" });
  }
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  const url = `data:${req.file.mimetype};base64,${b64}`;

  const result = await handleUploadImage(url);

  console.log(result);
  if (!result) {
    throw new customeError(400, "error accured");
  }

  res.json({
    success: true,
    result,
  });
};

// add a new Product

let product = async (req, res) => {
  console.log(req.body);
  let {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totleStock,
  } = req.body;

  if (
    !image ||
    !title ||
    !description ||
    !category ||
    !brand ||
    !price ||
    !salePrice ||
    !totleStock
  ) {
    throw new customeError(400, "enter the require field");
  }

  let mongo = new Product({
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totleStock,
  });

  await mongo.save();
  console.log(mongo);

  if (!mongo) {
    throw new customeError(500, "Internal server error ! ....");
  }

  res.status(200).json({
    success: true,
    message: "product list successful ",
  });
};

// featch all product

let featchAllProduct = async (req, res) => {
  const products = await Product.find();

  if (!products) {
    throw new customeError(500, "Error fetching products");
  }

  res.status(200).json({
    success: true,
    data: products,
  });
};

// featch single

let featchSingle = async (req, res) => {
  let { id } = req.params;

  if (!id) {
    throw new customeError(400, "user not founded");
  }

  const mongo = await Product.findById(id);

  console.log(mongo);

  res.status(200).json({
    success: true,
    data: mongo,
  });
};

// edit a product

let editProduct = async (req, res) => {
  let { id } = req.params;

  if (!id) {
    throw new customeError(400, "User not found");
  }

  const mongo = await Product.findByIdAndUpdate(id, req.body, { new: true });

  if (!mongo) {
    throw new customeError(500, "Erro updating product");
  }

  res.status(200).json({
    success: true,
    message: "Product updated SuccessFully",
    data: mongo,
  });
};

// delete a product

let deleteAllProduct = async (req, res) => {
  let { id } = req.params;

  if (!id) {
    throw new customeError(400, "Don't delete anythigs");
  }

  let mongo = await Product.findByIdAndDelete(id);

  cons;

  if (!mongo) {
    throw new customeError(400, "Data is not find");
  }

  res.status(200).json({
    success: true,
    message: "Delete succesfully",
  });
};

module.exports = {
  handelImageUpload,
  product,
  featchAllProduct,
  editProduct,
  deleteAllProduct,
  featchSingle,
};
