import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { captureOrder } from "../../../store/order-slice/index";

const PaypalReturn = () => {
  let dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("token");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      let orderId = JSON.parse(sessionStorage.getItem("OrderId"));

      const timer = setTimeout(() => {
        dispatch(captureOrder({ paymentId, payerId, orderId })).then((res) => {
          console.log(res);
          if (res?.payload?.success) {
            sessionStorage.removeItem("OrderId");
            window.location.href = "payment-success";
          }
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, paymentId, payerId]);

  console.log("paymentID", paymentId, "PayerId", payerId);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-10 max-w-md w-full text-center shadow-sm">
          {/* Spinner Icon */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin"></div>
            <div className="absolute inset-2 rounded-full bg-blue-50 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M3 9h18M7 15h2m4 0h2M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            Processing your payment
          </h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Please wait while we securely process your order. Do not close or
            refresh this page.
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-6 overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full w-0"
              style={{ animation: "progress 3s ease-out forwards" }}
            ></div>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-3 mb-6">
            {/* Step 1 - Done */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-3.5 h-3.5 text-green-700"
                  fill="none"
                  viewBox="0 0 12 12"
                >
                  <polyline
                    points="2,6 5,9 10,3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-500">Order confirmed</span>
              <span className="ml-auto text-xs text-green-600 font-medium">
                Done
              </span>
            </div>

            {/* Step 2 - Active */}
            <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex gap-1 w-6 justify-center flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0ms]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:150ms]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:300ms]"></span>
              </div>
              <span className="text-sm text-blue-700 font-medium">
                Verifying payment with PayPal
              </span>
            </div>

            {/* Step 3 - Pending */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
              <div className="w-6 h-6 rounded-full border-2 border-dashed border-gray-300 flex-shrink-0"></div>
              <span className="text-sm text-gray-400">
                Finalizing your order
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Secured by PayPal. Your payment info is encrypted.
            </p>
          </div>
        </div>

        <style>{`
        @keyframes progress {
          from { width: 0% }
          to { width: 85% }
        }
      `}</style>
      </div>
    </>
  );
};

export default PaypalReturn;

//  paymentId, payerId, orderId
