import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCart } from "../../../store/shopProducts/cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShopingProductTile = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reviewHandle = (val) => {
    navigate(`/shop/listing/${val}/review`);
  };
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition p-4 bg-white">
      <ToastContainer />
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        onClick={() => reviewHandle(product._id)}
        className="w-full h-48 object-cover rounded-md"
      />

      {/* Brand */}
      <p className="text-sm text-gray-500 mt-3">{product.brand}</p>

      {/* Title */}
      <h3 className="font-semibold text-lg mt-1">{product.title}</h3>

      {/* Description */}
      <p className="text-gray-500 text-sm mt-1 line-clamp-2">
        {product.description}
      </p>

      {/* Price Section */}
      <div className="flex items-center gap-3 mt-3">
        {/* Sale Price */}
        <span className="text-lg font-bold text-black">
          ₹{product.salePrice}
        </span>

        {/* Original Price */}
        <span className="text-gray-400 line-through">₹{product.price}</span>
      </div>

      {/* Add To Cart */}
      <button
        onClick={() =>
          dispatch(
            addCart({
              productid: product._id,
              quantity: 1,
            })
          ).then((res) => {
            if (res.payload.success) {
              toast.success("Product added to cart!");
            }
          })
        }
        className="w-full mt-4 bg-black text-white py-2 rounded-md hover:bg-gray-800"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ShopingProductTile;
