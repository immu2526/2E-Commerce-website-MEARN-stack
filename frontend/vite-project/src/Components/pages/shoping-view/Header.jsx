import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { MdAccountCircle } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../../store/autho-slice";
import { useNavigate } from "react-router-dom";

const ShopingHeader = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // use Store

  const { user } = useSelector((state) => state.auth);
  const logoutHandle = async () => {
    dispatch(logOut()).then((res) => {
      console.log(res);
    });
  };

  // for navigate

  const handleNavigate = () => {
    navigate("/shop/home");
  };

  const handleNavigate2 = () => {
    navigate("/shop/listing");
  };

  const accountHandler = () => {
    navigate("/shop/account");
  };

  const openHandle = () => {
    navigate("/shop/listing/cart");
  };

  return (
    <>
      <div className="h-[70px] md:h-[80px] lg:h-[90px] xl:h-[100px] 2xl:h-[110px] w-full flex flex-col border-b border-gray-400 items-center">
        <div className="h-[40px] w-full flex md:h-[50px] lg:h-[55px] xl:h-[60px] 2xl:h-[65px] lg:px-10 xl:px-20 2xl:px-32">
          <div className="flex justify-center items-center ml-[1%] lg:ml-0 lg:gap-2">
            <FaHome className="text-[24px] md:text-[38px] lg:text-[42px] xl:text-[46px] 2xl:text-[50px]" />
            <p className="w-auto text-[12px] font-bold pt-3 lg:text-[15px] xl:text-[17px] 2xl:text-[19px]">
              E-commerce
            </p>
          </div>

          {/* Search bar */}

          <div className="relative mt-1 ml-5 w-fit md:ml-40 lg:ml-auto lg:mr-4 xl:mr-8">
            <div className="relative rounded-full p-[2px] overflow-hidden">
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r 
            from-pink-500 via-purple-500 to-blue-500 
            animate-[spin_4s_linear_infinite]"
                style={{ inset: "-100%" }}
              />
              <div className="bg-white rounded-full relative z-10">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="
              w-40 md:w-80 lg:w-96 xl:w-[420px] 2xl:w-[500px]
              transition-all duration-300
              rounded-full
              pl-8 pr-3 py-1.5 md:pl-10 md:py-2 lg:py-2.5 lg:pl-11 xl:py-3
              text-xs md:text-sm lg:text-base
              outline-none"
                />
                <svg
                  className="absolute left-2 top-2 md:left-3 md:top-2.5 lg:left-3.5 lg:top-3 xl:top-3.5
              w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* cart & account */}

          <div className="flex items-center gap-3 ml-4 lg:gap-3 xl:gap-4">
            <div
              className="flex items-center justify-center 
    w-8 h-7 md:w-9 md:h-8 lg:w-10 lg:h-10 xl:w-11 xl:h-11 2xl:w-12 2xl:h-12
    mt-1 rounded-md border-2 border-gray-400 cursor-pointer 
    hover:border-purple-500 hover:text-purple-500 transition-colors"
            >
              <LuShoppingCart
                onClick={openHandle}
                className="text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[26px]"
              />
            </div>

            <div
              className="flex items-center justify-center 
    w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 2xl:w-12 2xl:h-12
    mt-1 rounded-full bg-black border-2 border-gray-400 cursor-pointer 
    hover:border-purple-500 hover:text-purple-500 transition-colors"
            >
              <MdAccountCircle
                onClick={() => setOpen(!open)}
                className="text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[26px] text-white"
              />
            </div>

            {/*  */}

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 top-15 w-40 bg-white shadow-lg rounded-md border z-50">
                <p className="px-4 py-2 text-sm text-gray-700 border-b">
                  Logged in as{" "}
                  <span className="font-semibold">{user?.user.userName}</span>
                </p>

                <button
                  onClick={accountHandler}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Account
                </button>

                <button
                  onClick={logoutHandle}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 ml-[10%] mt-2 text-[11px] md:ml-[8%] md:text-[17px] md:gap-6 lg:ml-0 lg:text-[16px] lg:gap-8 xl:text-[18px] xl:gap-10 2xl:text-[20px] 2xl:gap-14">
          <p
            onClick={handleNavigate}
            className="cursor-pointer hover:text-purple-500 transition-colors"
          >
            Home
          </p>
          <p
            onClick={handleNavigate2}
            className="cursor-pointer hover:text-purple-500 transition-colors"
          >
            Men
          </p>
          <p
            onClick={handleNavigate2}
            className="cursor-pointer hover:text-purple-500 transition-colors"
          >
            Women
          </p>
          <p
            onClick={handleNavigate2}
            className="cursor-pointer hover:text-purple-500 transition-colors"
          >
            Kids
          </p>
          <p
            onClick={handleNavigate2}
            className="cursor-pointer hover:text-purple-500 transition-colors"
          >
            Accessories
          </p>
        </div>
      </div>
    </>
  );
};

export default ShopingHeader;
