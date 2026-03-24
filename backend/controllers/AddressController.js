const customError2 = require("../errorHandle/customeError");
const Address = require("../models/AddressModels");

// Add address

const addAddress = async (req, res) => {
  const { userId } = req.params;
  const { address, city, pincode, phone, notes } = req.body;
  if (!address || !city || !pincode || !phone || !notes) {
    throw new customError2(400, "Missing the some value!");
  }

  if (!userId) {
    throw new customError2(400, "user not founded");
  }

  console.log(req.body);

  let mongo = new Address({
    userId: userId,
    address: address,
    city: city,
    pincode: pincode,
    phone: phone,
    note: notes,
  });

  if (!mongo) {
    throw new customError2(400, "Error in DataBases");
  }

  await mongo.save();

  res.status(200).json({
    success: true,
    data: mongo,
  });
};

// featch Address
const featchAddress = async (req, res) => {
  let { userId } = req.params;

  let mongo = await Address.find({ userId: userId });

  console.log("this is the featch all data ", mongo);

  if (!mongo) {
    throw new customError2(400, "Address not founded");
  }

  res.status(200).json({
    success: true,
    data: mongo,
  });
};

const findSingle = async (req, res) => {
  let { addressId } = req.params;

  console.log(addressId);

  if (!addressId) {
    throw new customError2(400, "Invailed value");
  }
  let mongo = await Address.findById(addressId);

  if (!mongo) {
    throw new customError2(400, "Address not founded!");
  }

  console.log(mongo);

  res.status(200).json({
    success: true,
    data: mongo,
  });
};

// update Address
const updateAddress = async (req, res) => {
  const { addressId, userId } = req.params;
  console.log(addressId, userId);
  if (!req.body) {
    throw new customError2(400, "Invailed value");
  }

  let findUser = await Address.find({ userId: userId });
  console.log(findUser);
  if (findUser.length === 0) {
    throw new customError2(401, "User not founded");
  }

  let mongo = await Address.findByIdAndUpdate(addressId, req.body, {
    returnDocument: "after",
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: mongo,
  });
};

// delete Address

const deletAddress = async (req, res) => {
  let { userId, productId } = req.params;
  console.log(userId, productId);
  if (!userId || !productId) {
    throw new customError2(400, "Invailed params");
  }

  let foundmong = await Address.find({ userId: userId });
  console.log(foundmong);

  if (foundmong.length === 0) {
    throw new customError2(400, "User not founded");
  }

  let mongo = await Address.findByIdAndDelete(productId);

  res.status(200).json({
    success: true,
    data: mongo,
  });
};

module.exports = {
  addAddress,
  featchAddress,
  updateAddress,
  deletAddress,
  findSingle,
};
