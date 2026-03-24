const customError2 = require("../errorHandle/customeError");
const Product = require("../models/Product");

const shopProduct = async (req, res) => {
  let mongo = await Product.find({});

  if (!mongo) {
    throw new customError2(400, "Product not founded!");
  }

  res.status(200).json({
    success: true,
    data: mongo,
  });
};

const individualPro = async (req, res) => {
  let { id } = req.params;
  if (!id) {
    throw new customError2(400, "product not founded");
  }

  let mongo = await Product.findById(id);

  res.status(200).json({
    success: true,
    data: mongo,
  });
};

module.exports = { shopProduct, individualPro };
