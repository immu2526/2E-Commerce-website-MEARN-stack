import React, { useEffect, useState } from "react";
import { Banner } from "../../../assets/asset";
import { IoChevronBackSharp } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import { Category } from "../../../assets/Category";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allProduct } from "../../../store/shopProducts/product-slice";
import { addCart } from "../../../store/shopProducts/cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
const ShopingHome = () => {
  const [slider, setSlider] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const banner = Banner;
  const categories = Category;

  const { productList } = useSelector((state) => state.shopProduct);

  const sliderHandler = () => {
    if (slider >= 2) {
      setSlider(0);
    } else {
      setSlider(slider + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      sliderHandler();
    }, 5000);
    return () => clearInterval(interval);
  }, [slider]);

  useEffect(() => {
    dispatch(allProduct());
  }, [dispatch]);

  const changeHandle = (val) => {
    navigate(`/shop/listing/${val}/review`);
  };

  return (
    <>
      <ToastContainer />
      <div
        className="w-full h-50 bg-cover bg-center bg-no-repeat flex justify-between items-center md:h-80 lg:h-98 xl:h-140"
        style={{ backgroundImage: `url(${banner[slider]})` }}
      >
        <div
          onClick={sliderHandler}
          className="px-1 py-1 bg-gray-200 border rounded-xl md:px-5 md:py-5 md:rounded-4xl"
        >
          <IoChevronBackSharp />
        </div>
        <div
          onClick={sliderHandler}
          className="px-1 py-1 bg-gray-200 border rounded-xl md:px-5 md:py-5 md:rounded-4xl"
        >
          <MdArrowForwardIos />
        </div>
      </div>

      {/* category */}

      <h2 className="text-sm  my-10 mx-10 font-bold md:text-2xl">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {categories.map((cat, ind) => (
          <div
            key={ind}
            className="flex flex-col items-center justify-center gap-5 py-6 px-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
          >
            {cat.icon}
            <span className="text-sm font-semibold text-gray-800">
              {cat.name}
            </span>
          </div>
        ))}
      </div>

      {/* product */}
      <div className="bg-gray-200 my-3">
        <h1 className="text-sm  my-10 mx-10 font-bold md:text-2xl  ">
          Product list
        </h1>
        <div className="w-full flex flex-wrap justify-evenly gap-3  md:gap-6 xl:gap-15  bg-gray-200 ">
          {productList &&
            productList.map((product) => {
              const isSale =
                product.salePrice > 0 && product.salePrice < product.price;

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-sm overflow-hidden border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col w-[45%] sm:w-[45%] md:w-[30%] lg:w-[20%] xl:w-[17%]"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-square md:aspect-[3/4] lg:aspect-[3/4] xl:aspect-[2/3] bg-gray-100 overflow-hidden">
                    <img
                      onClick={() => changeHandle(product._id)}
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    {isSale && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Sale
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-2 lg:p-3 xl:p-4 flex flex-col flex-1">
                    <div className="flex items-center justify-between ">
                      <span className="text-xs text-gray-400 uppercase tracking-wide">
                        {product.category}
                      </span>
                      <span className="text-xs font-medium text-gray-500">
                        {product.brand}
                      </span>
                    </div>

                    <h3 className="text-sm lg:text-base xl:text-lg font-semibold text-gray-900 mb-1  flex-1 line-clamp-2">
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-2 ">
                      {isSale ? (
                        <>
                          <span className="text-xs lg:text-sm text-gray-400 line-through">
                            ${product.price}
                          </span>
                          <span className="text-sm lg:text-base xl:text-lg font-bold text-gray-900">
                            ${product.salePrice}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm lg:text-base xl:text-lg font-bold text-gray-900">
                          ${product.price}
                        </span>
                      )}
                    </div>

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
                      className="w-full py-1.5 lg:py-2 xl:py-2.5 rounded-lg text-xs lg:text-sm font-semibold bg-gray-900 text-white hover:bg-gray-700 active:scale-95 transition-all duration-200"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopingHome;
