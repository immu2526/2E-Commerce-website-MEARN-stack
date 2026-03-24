import React, { useState } from "react";
import ProductFilter from "./Filter";
import { FaSort } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allProduct } from "../../../store/shopProducts/product-slice";
import ShopingProductTile from "./ShopingProductTile";
import filterProductItems from "./filterProductItems";
//

const ShopingListing = () => {
  const [openSort, setOpenSort] = useState(false);
  const [sortType, setSortType] = useState("");
  const [brand, setBrand] = useState([]);
  const [category, setcat] = useState([]);

  const { productList } = useSelector((state) => state.shopProduct);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allProduct())
      .then((res) => {})
      .catch((err) => console.log(err));
  }, [dispatch]);

  // ShortFilter

  let filterWork = filterProductItems(sortType, productList, brand, category);

  const handleShort = (val) => {
    setSortType(val);
  };

  // console.log(brand);
  // console.log(category);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
        <ProductFilter setBrand={setBrand} setcat={setcat} />
        <div className="bg-background rounded-lg shadow-sm">
          <div className="p-4 border-b flex item-center justify-between">
            <h2 className="text-lg font-extrabold">All Product</h2>
            <div className="flex items-center gap-4">
              {/* Product Count */}
              <span className="text-gray-500 text-sm">
                {filterWork.length} Products
              </span>

              {/* Sort Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => setOpenSort(!openSort)}
                  className="flex items-center gap-2 border px-3 py-1 rounded-md text-sm hover:bg-gray-100"
                >
                  <FaSort />
                  Sort by
                </button>

                {openSort && (
                  <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md border z-50">
                    <ul className="text-sm">
                      <li
                        onClick={() => handleShort("lowToHigh")}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Price: Low to High
                      </li>

                      <li
                        onClick={() => handleShort("highToLow")}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Price: High to Low
                      </li>

                      <li
                        onClick={() => handleShort("AToZ")}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Title: A to Z
                      </li>

                      <li
                        onClick={() => handleShort("ZToA")}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Title: Z to A
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-2">
            {filterWork.map((product) => (
              <ShopingProductTile key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopingListing;
