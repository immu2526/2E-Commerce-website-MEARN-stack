const { get } = require("mongoose");
const customError2 = require("../errorHandle/customeError");
const { ordersController } = require("../helper/paypal");
const Cart = require("../models/cart");
const Order = require("../models/order");

const createOrdered = async (req, res) => {
  const {
    userId,
    cartId,
    cartItems,
    addressInfo,
    orderStatus,
    paymentMethod,
    paymentStatus,
    totalAmount,
    orderedData,
    orderedUpdateDate,
    paymentId,
    payerId,
  } = req.body;

  // console.log("orderbody", req.body);

  // ✅ Item total calculate karo

  const INR_TO_USD = 84; // 1 USD = 84 INR

  const mappedItems = cartItems.map((item) => ({
    name: item.title,
    sku: item.productId,
    unitAmount: {
      currencyCode: "USD",
      value: (parseFloat(item.price) / INR_TO_USD).toFixed(2),
    },
    quantity: String(item.quantity),
  }));

  const itemTotal = mappedItems
    .reduce(
      (sum, item) =>
        sum + parseFloat(item.unitAmount.value) * parseInt(item.quantity),
      0
    )
    .toFixed(2);

  const orderRequest = {
    body: {
      intent: "CAPTURE",
      purchaseUnits: [
        {
          amount: {
            currencyCode: "USD",
            value: itemTotal,
            breakdown: {
              itemTotal: {
                currencyCode: "USD",
                value: itemTotal,
              },
            },
          },
          items: mappedItems,
        },
      ],
      applicationContext: {
        returnUrl:
          "https://twoe-commerce-website-mearn-stack-backend.onrender.com/api/shop/order/payment/paypal-return",
        cancelUrl:
          "https://twoe-commerce-website-mearn-stack-backend.onrender.com/api/shop/order/payment/paypal-cancel",
      },
    },
  };

  // console.log(
  //   "PayPal ko bhej raha hoon:",
  //   JSON.stringify(orderRequest.body, null, 2)
  // );

  const { body: paypalOrder } = await ordersController.createOrder(
    orderRequest
  );

  // console.log("PayPal se aaya:", paypalOrder);

  const newOrder = new Order({
    userId,
    cartId,
    cartItems,
    addressInfo,
    orderStatus,
    paymentMethod,
    paymentStatus,
    totalAmount,
    orderedData,
    orderedUpdateDate,
    paymentId,
    payerId,
  });

  await newOrder.save();

  const parsedOrder =
    typeof paypalOrder === "string" ? JSON.parse(paypalOrder) : paypalOrder;

  // console.log("PayPal se aaya:", parsedOrder);

  const approvalURL = parsedOrder.links.find(
    (link) => link.rel === "approve"
  )?.href;

  // console.log("approvalURL:", approvalURL);

  res.status(201).json({
    success: true,
    approvalURL,
    orderId: newOrder._id,
  });
};

const capturePayment = async (req, res) => {
  const { paymentId, payerId, orderId } = req.body;

  if (!paymentId || !payerId || !orderId) {
    throw new customError2(404, "body is empty");
  }

  let mongo = await Order.findById(orderId);

  if (!mongo) {
    throw new customError2(404, "Order can not be founded!");
  }

  mongo.orderStatus = "confirmed";
  mongo.paymentStatus = "paid";
  mongo.paymentId = paymentId;
  mongo.payerId = payerId;

  const cartId = mongo.cartId;

  await Cart.findByIdAndDelete(cartId);

  await mongo.save();

  res.status(200).json({
    success: true,
    message: "Ordered Confirmed",
    data: mongo,
  });
};

const allOrder = async (req, res) => {
  const mongo = await Order.find();
  res.status(200).json({
    success: true,
    data: mongo,
  });
};

const getAllUserByOrder = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new customError2(404, "User not Exist");
  }

  const mongo = await Order.find({ userId: userId });

  if (!mongo) {
    throw new customError2(404, "Order not founded");
  }

  res.status(200).json({
    success: true,
    data: mongo,
  });
};

const getOrderDetails = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new customError2(404, "Order not exist");
  }

  const mongo = await Order.findById(id);

  if (!mongo) {
    throw new customError2(404, "Order not found");
  }

  res.status(200).json({
    success: true,
    data: mongo,
  });
};

module.exports = {
  createOrdered,
  capturePayment,
  getAllUserByOrder,
  getOrderDetails,
  allOrder,
};
