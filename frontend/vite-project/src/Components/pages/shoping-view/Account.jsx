import React from "react";
import { AccountBanner } from "../../../assets/asset";
import Address from "./Address";

const ShopingAccount = () => {
  const banner = AccountBanner;
  console.log(banner[0]);
  return (
    <>
      <div
        className="w-full h-50 bg-cover bg-center bg-no-repeat flex justify-between items-center md:h-80 lg:h-98 xl:h-80"
        style={{ backgroundImage: `url(${banner[0]})` }}
      ></div>

      <Address />
    </>
  );
};

export default ShopingAccount;
