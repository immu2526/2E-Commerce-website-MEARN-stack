import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { featchOrderDetails } from "../../../../store/order-slice/featchOrderSlice";
// import {
//   featchOrder,
// } from "../../../store/order-slice/featchOrderSlice";

const AdminViewOrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { orderDetails, isLoading } = useSelector((state) => state.featchOrder);
  console.log(id);
  useEffect(() => {
    dispatch(featchOrderDetails(id));
  }, [dispatch]);

  console.log(orderDetails);

  //

  if (isLoading === true) {
    return <p>loading...</p>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Go Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      {/* Order Info */}
      <div className="border p-4 rounded mb-4">
        <p>
          <strong>Order ID:</strong> {orderDetails?._id}
        </p>
        <p>
          <strong>Status:</strong> {orderDetails?.orderStatus}
        </p>
        <p>
          <strong>Payment Method:</strong> {orderDetails?.paymentMethod}
        </p>
        <p>
          <strong>Payment Status:</strong> {orderDetails?.paymentStatus}
        </p>
        <p>
          <strong>Total Amount:</strong> ₹
          {orderDetails?.totalAmount?.toLocaleString("en-IN")}
        </p>
        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(orderDetails?.orderedData).toLocaleString()}
        </p>
      </div>

      {/* Address Info */}
      <div className="border p-4 rounded mb-4">
        <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
        <p>{orderDetails?.addressInfo?.address}</p>
        <p>{orderDetails?.addressInfo?.city}</p>
        <p>{orderDetails?.addressInfo?.pincode}</p>
        <p>{orderDetails?.addressInfo?.phone}</p>
      </div>

      {/* Cart Items */}
      <div className="border p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Items</h3>

        {orderDetails?.cartItems?.map((item) => (
          <div key={item._id} className="flex items-center gap-4 border-b py-2">
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <p className="font-semibold">{item.title}</p>
              <p>Price: ₹{item.price.toLocaleString("en-IN")}</p>
              <p>Qty: {item.quantity}</p>
            </div>

            <div>
              <p className="font-bold">
                ₹{item.price * item.quantity.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminViewOrderDetails;
