import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Image_upload = ({ setImageUrl, imageUrl }) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile); // ✅ actual file store karo
      setPreview(URL.createObjectURL(selectedFile)); // ✅ sirf preview ke liye
    }
  };

  // console.log(imageUrl.result.url);
  // image upload to cloudinary

  let uploadImageToCloudinary = async () => {
    let data = new FormData();
    data.append("my_file", file);
    const response = await axios.post(
      "https://twoe-commerce-website-mearn-stack.onrender.com/api/admin/product/image-upload",
      data
    );
    // console.log("response", response);
    if (response) {
      setImageUrl(response.data);
      setPreview(response.data);
    }
  };

  useEffect(() => {
    if (file !== null) uploadImageToCloudinary();
  }, [file]);

  return (
    <>
      <div className="w-full max-w-md mx-auto space-y-6">
        <div>
          <label className="block font-medium mb-2">Upload Image</label>

          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
          >
            {preview ? (
              <img
                src={imageUrl || preview}
                alt="Preview"
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <>
                <span className="text-gray-600 text-sm">
                  Click to upload image
                </span>
                <span className="text-gray-400 text-xs mt-1">
                  PNG, JPG up to 5MB
                </span>
              </>
            )}
          </label>

          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>
    </>
  );
};

export default Image_upload;
