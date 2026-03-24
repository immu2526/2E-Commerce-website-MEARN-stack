import { LuLayoutDashboard } from "react-icons/lu";
import { TbShoppingBag } from "react-icons/tb";
import { MdOutlineVerified } from "react-icons/md";

export const feature = [
  {
    id: "deshboard",
    lable: "Deshboard",
    path: "/admin/deskboard",
    icon: <LuLayoutDashboard />,
  },
  {
    id: "product",
    lable: "Product",
    path: "/admin/product",
    icon: <TbShoppingBag />,
  },
  {
    id: "orders",
    lable: "orders",
    path: "/admin/ordered",
    icon: <MdOutlineVerified />,
  },
];
