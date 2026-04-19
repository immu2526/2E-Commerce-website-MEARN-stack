import React, { useState } from "react";
import Image_upload from "../Admin/admin-views/Image-Upload";
import axios from "axios";
import AdminProductList from "../Admin/admin-views/Admin-Product";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//

const AdminProduct = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [formdata, setformdata] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totleStock: "",
  });

  let handleChange = async (e) => {
    let { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = {
      ...formdata,
      image: imageUrl.result.url,
    };

    try {
      let response = await axios.post(
        "https://twoe-commerce-website-mearn-stack-backend.onrender.com/api/admin/product/new/product",
        finalData
      );

      if (response.data.success) {
        toast.success("Product Added ");
        setformdata({
          title: "",
          description: "",
          category: "",
          brand: "",
          price: "",
          salePrice: "",
          totleStock: "",
        });
        // navigate("/admin/product");
        setOpenDrawer(false);
      }
    } catch (err) {
      toast.error("Oops Something wrong");
    }
    console.log(response);
  };

  console.log(formdata);
  console.log(imageUrl);

  return (
    <>
      <AdminProductList />
      <ToastContainer />
      <div className="h-[50px]  w-[80px] flex justify-end">
        <button
          onClick={() => setOpenDrawer(true)}
          className=" h-[25px] w-auto  md:h-[40px] md:w-[80px] bg-gray-900 text-white px-1 py-1 rounded-sm text-[8px]
        md:text-[15px] font-semibold shadow-md hover:scale-105 transition-transform duration-200"
        >
          Add Item
        </button>
      </div>

      {/* Overlay */}
      {openDrawer && (
        <div
          onClick={() => setOpenDrawer(false)}
          className="fixed inset-0 bg-black/40 z-40"
        ></div>
      )}

      {/* Right Side Drawer */}
      <div
        className={`fixed top-10 right-0 
  h-[86vh] w-[90%] md:w-[40%]
  bg-white rounded-lg shadow-xl z-50
  transform transition-transform duration-300
  flex flex-col
  ${openDrawer ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">Add Product</h2>
          <button
            onClick={() => setOpenDrawer(false)}
            className="text-gray-600 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Form */}

        <div className="p-4 overflow-y-auto h-full ">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* iamge */}

            <Image_upload setImageUrl={setImageUrl} imageUrl={imageUrl} />

            {/* Title */}
            <div className="flex flex-col">
              <label htmlFor="title" className="text-sm font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Product Name"
                onChange={handleChange}
                value={formdata.title}
                className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label htmlFor="des" className="text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                id="des"
                placeholder="Product Description"
                name="description"
                onChange={handleChange}
                value={formdata.description}
                rows="3"
                className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              ></textarea>
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label htmlFor="category" className="text-sm font-medium mb-1">
                Category
              </label>

              <select
                id="category"
                name="category"
                onChange={handleChange}
                value={formdata.category}
                className="w-full border border-gray-300 p-2 rounded-md text-sm 
    focus:outline-none focus:ring-2 focus:ring-gray-800 bg-white"
              >
                <option value="">Select Category</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="child">Child</option>
                <option value="accessories">Accessories</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>

            {/* Brand */}
            <div className="flex flex-col">
              <label htmlFor="brand" className="text-sm font-medium mb-1">
                Brand
              </label>

              <select
                id="brand"
                name="brand"
                onChange={handleChange}
                value={formdata.brand}
                className="w-full border border-gray-300 p-2 rounded-md text-sm 
    focus:outline-none focus:ring-2 focus:ring-gray-800 bg-white"
              >
                <option value="">Select Brand</option>
                <option value="nike">Nike</option>
                <option value="adidas">Adidas</option>
                <option value="puma">Puma</option>
                <option value="zara">Zara</option>
                <option value="h&m">H&M</option>
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col">
              <label htmlFor="price" className="text-sm font-medium mb-1">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Enter Price"
                onChange={handleChange}
                value={formdata.price}
                className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            {/* Sale Price */}
            <div className="flex flex-col">
              <label htmlFor="saleprice" className="text-sm font-medium mb-1">
                Sale Price
              </label>
              <input
                type="number"
                id="saleprice"
                name="salePrice"
                placeholder="Enter Sale Price"
                onChange={handleChange}
                value={formdata.salePrice}
                className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            {/* Total Stock */}
            <div className="flex flex-col">
              <label htmlFor="stock" className="text-sm font-medium mb-1">
                Total Stock
              </label>
              <input
                type="number"
                id="stock"
                name="totleStock"
                placeholder="Available Stock"
                onChange={handleChange}
                value={formdata.totleStock}
                className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-md text-sm font-medium hover:bg-black transition"
            >
              Save Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminProduct;
