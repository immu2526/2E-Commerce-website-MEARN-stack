const express = require("express");
const mongoose = require("mongoose");
const parseCookies = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const userRoute = require("./routes/userRouter");
const shopProductRoute = require("./routes/shopProductRoute");
const reviewRoute = require("./routes/reviewRoute");
const adminProductRouter = require("./routes/admin/product-route");
const cartRoute = require("./routes/cartRoute");
const AddressRoute = require("./routes/adddressRoute");
const orderRoute = require("./routes/orderRoute");

// call the mongoose DB
async function main() {
  await mongoose.connect(
    "mongodb+srv://helloworld52980_db_user:Imran%40786@cluster0.wympqk4.mongodb.net/?appName=Cluster0"
  );
}

main()
  .then(() => console.log("mongoDB connected sucessfully"))
  .catch((err) => console.log(err));

// localhost

let app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(parseCookies());

// router middleware

app.use("/api/auth", userRoute);
app.use("/api/admin/product", adminProductRouter);
app.use("/api/shop/product", shopProductRoute);
app.use("/api/shop/product/review", reviewRoute);
app.use("/api/shop/product/cart", cartRoute);
app.use("/api/shop/product/address", AddressRoute);
app.use("/api/shop/order/payment", orderRoute);

// error handling middleware

app.use((err, req, res, next) => {
  // Duplicate key error
  if (err.code === 11000) {
    const errorFilter = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${errorFilter} already exists`,
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is runnnig on port ${port}`);
});
