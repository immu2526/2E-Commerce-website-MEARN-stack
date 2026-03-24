import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, featchAllProduct } from "../../../../store/Products";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminProductList = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();

  let { productList } = useSelector((state) => state.product);
  //   console.log(productList);

  useEffect(() => {
    dispatch(featchAllProduct());
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <div className="bg-white w-full">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Products
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {productList.map((product) => (
              <div key={product._id} className="group relative">
                {/* Image */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:h-56"
                />

                {/* Product Info */}
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {product.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Brand: {product.brand}
                  </p>

                  <p className="text-sm text-gray-500">
                    Category: {product.category}
                  </p>

                  <p className="text-sm font-medium text-gray-900 mt-1">
                    ₹{product.price?.toLocaleString()}
                  </p>

                  <p className="text-xs text-gray-400">
                    Stock: {product.totleStock}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => {
                        navigate(`/admin/product/${product._id}/update`);
                      }}
                      className="flex-1 bg-blue-500 text-white text-sm py-1 rounded hover:bg-blue-600"
                    >
                      Update
                    </button>

                    <button
                      onClick={() =>
                        dispatch(deleteProduct(product._id)).then((res) => {
                          if (res.payload.success) {
                            toast.success("Product deleted successfully");
                            navigate("/admin/product");
                          }
                        })
                      }
                      className="flex-1 bg-red-500 text-white text-sm py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductList;
