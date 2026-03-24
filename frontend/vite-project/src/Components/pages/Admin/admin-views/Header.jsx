import React from "react";
import { IoIosMenu } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../../../store/autho-slice";

const Header = ({ opensidebar, closesidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    dispatch(logOut()).then((res) => {
      if (res.payload.success) {
        navigate("/autho/login");
      }
    });
  };

  return (
    <>
      <div className="w-full h-[40px] md:h-[70px] flex items-center justify-between px-5 border-1 border-gray-500">
        <IoIosMenu
          onClick={() => closesidebar(!opensidebar)}
          className=" block lg:invisible h-[20px] w-[30px]  md:h-[35px] md:w-[60px] bg-black text-white rounded-md"
        />

        {/*  */}

        <div className="h-[53%] w-[50px] bg-black md:h-[50%] md:w-[90px] rounded-md flex justify-center md:gap-1 items-center  text-white">
          <IoIosLogOut className="text-white h-[10px] w-[20px] md:h-[40px] md:w-[50px]" />
          <p className="text-[8px] md:text-xl" onClick={handleLogOut}>
            Logout
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
