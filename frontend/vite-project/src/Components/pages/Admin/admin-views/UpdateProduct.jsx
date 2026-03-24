import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { featchSingleProduct, updateProduct } from "../../../../store/Products";
import { useDispatch } from "react-redux";
import Image_upload from "./Image-Upload";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

//

const UpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState();

  const [formdata, setformdata] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totleStock: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formdata,
      image: imageUrl?.result?.url || formdata.image,
    };

    dispatch(updateProduct({ data: finalData, id }))
      .then((res) => {
        if (res.payload.success) {
          toast.success("Product Updated");
          navigate("/admin/product");
        }
      })
      .catch((err) => {
        toast.error("Try again");
      });
  };

  useEffect(() => {
    dispatch(featchSingleProduct(id)).then((res) => {
      // console.log(res.payload.data);
      setformdata(res.payload.data);
    });
  }, [dispatch, id]);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-[50%]">
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
          <br />
        </div>
      </div>
    </>
  );
};

// export default UpdateProduct;

export default UpdateForm;
