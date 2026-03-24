import React from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { feature } from "../../../../assets/Userpannel";
import { RxCross2 } from "react-icons/rx";

import { NavLink } from "react-router-dom";
const UserPannel = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        {feature.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md cursor-pointer transition
            
            ${
              isActive
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`
            }
          >
            <span className="text-sm">{item.icon}</span>
            <span className="text-[8px] font-medium">{item.lable}</span>
          </NavLink>
        ))}
      </div>
    </>
  );
};

const Sidebar = ({ opensidebar, closesidebar }) => {
  return (
    <div
      className={`fixed lg:static top-0 left-0 h-full bg-white z-50 
      w-[35%] md:w-[15%] border-r border-gray-500 
      transform transition-transform duration-300 ease-in-out  
      ${opensidebar ? "translate-x-0" : "-translate-x-full"}
       lg:translate-x-0
      `}
    >
      {/* Close Button */}
      <div className="ml-auto p-2 cursor-pointer">
        <RxCross2
          onClick={() => closesidebar(false)}
          className="h-[20px] w-[20px]"
        />
      </div>

      <div className="flex gap-1.5 px-4 mb-3">
        <BsGraphUpArrow className="h-[20px] w-[25px]" />
        <p className="font-bold text-sm">Admin Panel</p>
      </div>

      <div className="flex justify-center">
        <hr className="mb-3 w-25 text-center text-gray-400 " />
      </div>
      <UserPannel />
    </div>
  );
};

export default Sidebar;
