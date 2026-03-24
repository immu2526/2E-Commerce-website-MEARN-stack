// const { use } = require("react");
const customError2 = require("../errorHandle/customeError");

const Review = require("../models/comment");

let createReview = async (req, res) => {
  let user = req.user;
  console.log("this is user id", user._id);
  let { text, rating } = req.body;
  console.log(req.body);
  console.log(text, rating);
  let { id } = req.params;
  console.log(id);

  if (!req.body) {
    throw new customError2(400, "fill the requied field");
  }

  const mongo = new Review({
    text: text,
    rating: rating,
    user: user._id,
    product: id,
  });

  mongo.save();

  res.status(200).json({
    success: true,
    data: mongo,
  });
};

let allReview = async (req, res) => {
  let { id } = req.params;
  let mongo = await Review.find({ product: id })
    .populate("user")
    .populate("product");
  res.status(200).json({
    success: true,
    data: mongo,
  });
};

let deleteReview = async (req, res) => {
  const { id } = req.params;

  const mongo = await Review.findByIdAndDelete(id);

  res.json({
    success: true,
    message: "Review deleted successfully",
    data: mongo,
  });
};

module.exports = { createReview, allReview, deleteReview };
