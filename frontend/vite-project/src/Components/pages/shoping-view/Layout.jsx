import React from "react";
import { Outlet } from "react-router-dom";
import ShopingHeader from "./Header";

const ShopingLayout = () => {
  return (
    <>
      <div className="flex flex-col bh-white overflow-hidden">
        {/* Common header */}
        <ShopingHeader />
        <main className="flex flex-col w-full">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default ShopingLayout;
