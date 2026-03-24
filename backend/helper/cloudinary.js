const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dxl41jl2n",
  api_key: "552422431175978",
  api_secret: "1wBQDZpQcs3lcq3WAxms_AwlDWM",
});

const storage = multer.memoryStorage(); // 👈 NO 'new'

let handleUploadImage = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: "E-Commerce",
  });
  return result;
};

const upload = multer({ storage });

module.exports = { upload, handleUploadImage };
