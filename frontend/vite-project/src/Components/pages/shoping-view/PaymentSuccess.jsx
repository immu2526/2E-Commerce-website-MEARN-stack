import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pop { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
        @keyframes fall { 0%{transform:translateY(-10px) rotate(0deg);opacity:1} 100%{transform:translateY(600px) rotate(720deg);opacity:0} }
        @keyframes progress { from{width:0%} to{width:100%} }
        .ring-spin { animation: spin 1.2s linear infinite; }
        .ring-done { animation: none !important; border-color: #1D9E75 !important; border-top-color: #1D9E75 !important; }
        .confetti-piece { position: absolute; width: 7px; height: 7px; border-radius: 1px; animation: fall linear forwards; }
      `}</style>

      <div className="bg-white border border-gray-100 rounded-2xl p-10 max-w-md w-full text-center relative overflow-hidden shadow-sm">
        {/* Confetti */}
        {animate &&
          [...Array(40)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10px",
                background: [
                  "#1D9E75",
                  "#5DCAA5",
                  "#9FE1CB",
                  "#FAC775",
                  "#EF9F27",
                  "#E1F5EE",
                ][Math.floor(Math.random() * 6)],
                animationDuration: `${1.2 + Math.random() * 1.5}s`,
                animationDelay: `${Math.random() * 0.4}s`,
              }}
            />
          ))}

        {/* Ring icon */}
        <div
          className="relative w-22 h-22 mx-auto mb-6"
          style={{ width: 88, height: 88 }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-gray-100" />
          <div
            className={`absolute inset-0 rounded-full border-2 border-transparent ${
              animate ? "ring-done" : "ring-spin"
            }`}
            style={{ borderTopColor: animate ? "#1D9E75" : "#1D9E75" }}
          />
          <div
            className="absolute rounded-full flex items-center justify-center"
            style={{ inset: 8, background: "#E1F5EE" }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <polyline
                points="7,17 13,23 25,10"
                stroke="#1D9E75"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="30"
                strokeDashoffset={animate ? "0" : "30"}
                style={{ transition: "stroke-dashoffset 0.4s ease 0.3s" }}
              />
            </svg>
          </div>
        </div>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{ background: "#E1F5EE", color: "#0F6E56" }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#1D9E75" }}
          />
          Payment verified
        </div>

        {/* Title */}
        <h1
          className="text-2xl font-normal mb-2"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Order Confirmed!
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          Thank you for your purchase. Your order has been placed successfully
          and is being processed.
        </p>

        {/* Order details */}
        <div className="border-t border-gray-100 pt-4 mb-4 text-left space-y-2">
          {[
            ["Payment", "PayPal"],
            ["Status", "Confirmed"],
            ["Estimated delivery", "3–5 business days"],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-gray-400">{label}</span>
              <span
                className={`font-medium ${
                  label === "Status" ? "text-green-600" : "text-gray-800"
                }`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <button
          onClick={() => navigate("/shop/home")}
          className="w-full py-3 rounded-xl text-sm font-medium text-white mb-2 transition-all"
          style={{ background: "#0F6E56" }}
          onMouseEnter={(e) => (e.target.style.background = "#085041")}
          onMouseLeave={(e) => (e.target.style.background = "#0F6E56")}
        >
          Continue Shopping
        </button>
        <button
          onClick={() => navigate("/shop/account")}
          className="w-full py-3 rounded-xl text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all"
        >
          View My Orders
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
