import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrder,
  featchOrder,
} from "../../../store/order-slice/featchOrderSlice";
import { useNavigate } from "react-router-dom";

const AdminOrdered = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderList, isLoading } = useSelector((state) => state.featchOrder);
  console.log(orderList);

  useEffect(() => {
    dispatch(allOrder());
  }, [dispatch]);

  let orderDetails = (id) => {
    navigate(`/admin/${id}/details`);
  };

  if (isLoading === true) {
    return <p>Please wait ...</p>;
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm">
      {/* ── Header ── */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] border-b border-slate-100 bg-slate-50 rounded-t-2xl px-2 sm:px-4 md:px-6 py-2 sm:py-3">
        <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-widest text-slate-400">
          Order ID
        </span>
        <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-widest text-slate-400 text-center">
          Status
        </span>
        <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-widest text-slate-400 text-right">
          Total
        </span>
        <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-widest text-slate-400 text-right">
          Details
        </span>
      </div>

      {/* ── Rows ── */}
      {orderList.map((order, i) => (
        <div
          key={order._id}
          className={`grid grid-cols-[2fr_1fr_1fr_1fr] items-center px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 hover:bg-slate-50 transition-colors duration-200 ${
            i !== orderList.length - 1 ? "border-b border-slate-100" : "" // ✅ fix 1
          }`}
        >
          {/* Item */}
          <div className="flex items-center gap-1.5 sm:gap-1 md:gap-4 min-w-0">
            <p className="text-[12px] truncate">{order._id}</p>
          </div>

          {/* Status  bg-amber-100 text-amber-600 */}
          <div className="flex justify-center">
            <span
              className={` ${
                order.paymentStatus === "paid"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }   text-xs font-semibold px-2.5 py-1 rounded-full`}
            >
              {order.paymentStatus}
            </span>
          </div>

          {/* Total */}
          <p className="text-right font-bold text-slate-800 text-[10px] sm:text-xs md:text-sm">
            ₹{order.totalAmount?.toLocaleString("en-IN")}
          </p>

          {/* Button */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                orderDetails(order._id);
              }}
              className="px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white text-[9px] sm:text-[10px] md:text-xs font-semibold rounded-lg sm:rounded-xl transition-all duration-200 hover:shadow-md hover:shadow-indigo-200 whitespace-nowrap"
            >
              Order Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrdered;
