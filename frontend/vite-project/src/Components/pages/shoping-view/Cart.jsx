import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  allCart,
  decreaseQuantity,
  deleteCart,
} from "../../../store/shopProducts/cart";
import { createNewOrder } from "../../../store/order-slice/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  let dispatch = useDispatch();

  let { cartList, isLoading } = useSelector((state) => state.cart);
  const { addressList } = useSelector((state) => state.address);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  let { user } = useSelector((state) => state.auth);
  const selectedId = useSelector((state) => state.selectedAddress.selectedId);
  // console.log("selected single id", selectedId, "address", addressList);

  useEffect(() => {
    dispatch(allCart()).then((res) => console.log(res));
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading Cart...</p>;
  }

  console.log("selected single id", selectedId, "address", addressList);

  const filterAddress = addressList.filter((val) => val._id === selectedId);

  const items = cartList?.[0]?.items || [];

  let totalPrice = items.reduce(
    (acc, item) => acc + item.productId.salePrice * item.quantity,
    0
  );

  const handleIncrease = (id) => {
    dispatch(addCart({ productid: id, quantity: 1 })).then(() =>
      dispatch(allCart())
    );
  };

  const handleDecrease = (productId) => {
    console.log(productId);
    dispatch(decreaseQuantity({ productId })).then((res) =>
      dispatch(allCart())
    );
  };

  const removeHandle = (productId) => {
    console.log(productId);
    dispatch(deleteCart({ productId })).then((res) => dispatch(allCart()));
  };

  const handleInitialPaypalPayment = () => {
    if (filterAddress.length === 0) {
      return toast.error("Please select the address");
    }

    if (cartList[0].items.length === 0) {
      return toast.error("Please add the Items");
    }

    const orderData = {
      userId: user?.user.id,
      cartId: cartList[0]?._id,
      cartItems: cartList[0].items.map((val) => ({
        productId: val?.productId._id,
        title: val?.productId.title,
        image: val?.productId.image,
        price:
          val?.productId.salePrice > 0
            ? val?.productId.salePrice
            : val?.productId.price,
        quantity: val?.quantity,
      })),
      addressInfo: {
        addressId: filterAddress[0]._id,
        address: filterAddress[0].address,
        city: filterAddress[0].city,
        pincode: filterAddress[0].pincode,
        phone: filterAddress[0].phone,
        notes: filterAddress[0].note,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalPrice,
      orderedData: new Date(),
      orderedUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    console.log(orderData);
    dispatch(createNewOrder(orderData))
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-6 px-3 sm:py-8 sm:px-4 lg:py-10 lg:px-6">
        <div className="max-w-7xl mx-auto 2xl:max-w-screen-2xl">
          {/* Page Title */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">
            Shopping Cart
          </h2>
          <ToastContainer />
          {/* Cart Table — Desktop/Tablet */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-5 sm:mb-6">
            {/* TABLE VIEW — md and above */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left text-xs sm:text-sm font-semibold text-gray-600 px-4 lg:px-6 py-3 lg:py-4">
                      Product
                    </th>
                    <th className="text-right text-xs sm:text-sm font-semibold text-gray-600 px-4 lg:px-6 py-3 lg:py-4">
                      Price
                    </th>
                    <th className="text-center text-xs sm:text-sm font-semibold text-gray-600 px-4 lg:px-6 py-3 lg:py-4">
                      Quantity
                    </th>
                    <th className="text-right text-xs sm:text-sm font-semibold text-gray-600 px-4 lg:px-6 py-3 lg:py-4">
                      Total
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, ind) => (
                    <tr
                      key={ind}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      {/* Product */}
                      <td className="px-4 lg:px-6 py-3 lg:py-4">
                        <div className="flex items-center gap-3 lg:gap-4">
                          <img
                            src={item.productId.image}
                            alt=""
                            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 2xl:w-20 2xl:h-20 object-cover rounded-md border border-gray-100 hover:scale-105 transition flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm lg:text-base font-semibold text-gray-800 truncate max-w-[140px] sm:max-w-[200px] lg:max-w-xs 2xl:max-w-md">
                              {item.productId.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              SKU: {item.productId._id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-right">
                        <span className="text-xs sm:text-sm text-gray-700">
                          ₹{item.productId.salePrice}
                        </span>
                      </td>

                      {/* Quantity */}
                      <td className="px-4 lg:px-6 py-3 lg:py-4">
                        <div className="flex items-center justify-center gap-1 sm:gap-2">
                          <button
                            onClick={() => handleDecrease(item.productId._id)}
                            className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition text-sm"
                          >
                            -
                          </button>
                          <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-medium text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrease(item.productId._id)}
                            className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition text-sm"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Total */}
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-right">
                        <span className="text-xs sm:text-sm font-semibold text-gray-800">
                          ₹{item.productId.salePrice * item.quantity}
                        </span>
                      </td>

                      {/* Remove */}
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-center">
                        <button
                          onClick={() => removeHandle(item.productId._id)}
                          className="text-gray-400 hover:text-red-500 transition text-lg font-light"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CARD VIEW — mobile only (below md) */}
            <div className="md:hidden divide-y divide-gray-100">
              {items.map((item, ind) => (
                <div key={ind} className="p-4 flex gap-3">
                  <img
                    src={item.productId.image}
                    alt=""
                    className="w-20 h-20 object-cover rounded-md border border-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
                        {item.productId.title}
                      </p>
                      <button
                        onClick={() => removeHandle(item.productId._id)}
                        className="text-gray-400 hover:text-red-500 transition text-base flex-shrink-0"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 border border-gray-200 rounded-md px-2 py-1">
                        <button
                          onClick={() => handleDecrease(item.productId._id)}
                          className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-orange-500 transition text-sm"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium text-gray-800 w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrease(item.productId._id)}
                          className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-orange-500 transition text-sm"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">
                          ₹{item.productId.salePrice} × {item.quantity}
                        </p>
                        <p className="text-sm font-bold text-gray-800">
                          ₹{item.productId.salePrice * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo + Update Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 lg:px-6 py-4 border-t border-gray-100">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Promo Code Here"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 flex-1 sm:w-48 lg:w-56"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-md transition whitespace-nowrap">
                  Apply
                </button>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-md transition w-full sm:w-auto">
                Add More Product
              </button>
            </div>
          </div>

          {/* Cart Totals */}
          <div className="flex justify-end">
            <div className="w-full sm:w-96 lg:w-80 xl:w-96 2xl:w-[420px] bg-white rounded-lg shadow-sm p-5 lg:p-6">
              <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-4 lg:mb-5">
                Cart Totals
              </h3>

              {/* Subtotal */}
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-sm font-semibold text-gray-800">
                  ₹{totalPrice}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Shipping</span>
                <span className="text-sm text-orange-500 font-medium">
                  Free Shipping
                </span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center py-4">
                <span className="text-sm font-semibold text-gray-800">
                  Total
                </span>
                <span className="text-base lg:text-lg font-bold text-gray-900">
                  ₹{totalPrice}
                </span>
              </div>

              <button
                onClick={handleInitialPaypalPayment}
                className="w-full bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-semibold py-3 rounded-md transition text-sm lg:text-base tracking-wide"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
