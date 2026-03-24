import React from "react";
import { filterProduct } from "../../../config";
import { useSearchParams } from "react-router-dom";

const ProductFilter = ({ setBrand, setcat }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  let filterHandle = (key, option, checked) => {
    const params = new URLSearchParams(searchParams);

    if (key === "brandName") {
      // url set
      let brands = params.get("brandName");
      brands = brands ? brands.split(",") : [];
      if (brands.includes(option.lable)) {
        brands = brands.filter((b) => b !== option.lable);
      } else {
        brands.push(option.lable);
      }
      params.set("brandName", brands.join(","));
      setSearchParams(params);

      // state update
      setBrand((prev) =>
        checked
          ? [...prev, option.lable]
          : prev.filter((b) => b !== option.lable)
      );
    }

    if (key === "category") {
      // url set
      let categories = params.get("category");
      categories = categories ? categories.split(",") : [];
      if (categories.includes(option.lable)) {
        categories = categories.filter((c) => c !== option.lable);
      } else {
        categories.push(option.lable);
      }

      params.set("category", categories.join(","));
      setSearchParams(params);

      //
      setcat((prev) =>
        checked
          ? [...prev, option.lable]
          : prev.filter((c) => c !== option.lable)
      );
    }
  };
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>

      <div className="p-4 space-y-4">
        {Object.keys(filterProduct).map((keyItem) => (
          <div key={keyItem} className="pb-4 border-b last:border-b-0">
            <h3 className="text-base font-bold capitalize">{keyItem}</h3>

            <div className="grid gap-2 mt-2">
              {filterProduct[keyItem].map((option, index) => (
                <label
                  key={option.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    onChange={(e) =>
                      filterHandle(keyItem, option, e.target.checked)
                    }
                    type="checkbox"
                    className="cursor-pointer"
                  />
                  <span>{option.lable}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
