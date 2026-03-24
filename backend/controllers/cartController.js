const { mongo } = require("mongoose");
const customError2 = require("../errorHandle/customeError");
const Cart = require("../models/cart");
const Product = require("../models/Product");

// const Cart=require

// add cart

let addCart = async (req, res) => {
  let { productid, quantity } = req.body;

  let userId = req.user.id;
  console.log(userId);
  console.log("pro ID", productid);
  console.log("Quantity", quantity);

  if (!productid || quantity <= 0) {
    throw new customError2(400, "invalid data provide");
  }

  let productmongo = await Product.findById(productid);

  if (!productmongo) {
    throw new customError2(400, "Product not founded");
  }

  let mongo = await Cart.findOne({ userId });

  if (!mongo) {
    mongo = new Cart({
      userId: userId,
      items: [],
    });
  }

  let findCurrentProductIndex = mongo.items.findIndex(
    (item) => item.productId.toString() === productid
  );

  if (findCurrentProductIndex > -1) {
    // product already  → quantity update
    mongo.items[findCurrentProductIndex].quantity += quantity;
  } else {
    mongo.items.push({
      productId: productid,
      quantity: quantity,
    });
  }

  await mongo.save();

  res.status(200).json({
    success: true,
    mongo,
  });
};

// featchCartItems

let featchCartItems = async (req, res) => {
  let userId = req.user;

  let mongo = await Cart.find({ userId: userId }).populate("items.productId");
  console.log(mongo);

  res.status(200).json({
    success: true,
    data: mongo,
  });
};

// decrease Quantity

let decreCartItems = async (req, res) => {
  let { productId } = req.body;
  let userId = req.user.id;
  console.log(productId);
  console.log(userId);

  let mongo = await Cart.findOne({ userId: userId });

  console.log("find", mongo);

  if (!mongo) {
    res.status(200).josn({
      success: false,
      message: "User not found",
    });
  }

  let index = mongo.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  console.log("index", index);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Product not in cart",
    });
  }

  mongo.items[index].quantity -= 1;

  if (mongo.items[index].quantity <= 0) {
    mongo.items.splice(index, 1);
  }

  mongo.save();

  console.log(mongo);

  res.status(200).json({
    success: true,
    data: mongo,
  });
};

// delete cart

let deleteCartItem = async (req, res) => {
  let { productId } = req.body;
  let userId = req.user.id;

  console.log("this is uid", userId);
  console.log("this is proID", productId);

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }

  // product remove
  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  await cart.save();

  res.status(200).json({
    success: true,
    data: cart,
  });
};

module.exports = { addCart, featchCartItems, decreCartItems, deleteCartItem };
