import React, { useEffect, useState } from "react";
import Order from "./Order";
import Switch from "react-switch";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  featchAddress,
} from "../../../store/shopProducts/address";

import { useNavigate } from "react-router-dom";
import { setSelectedId } from "../../../store/order-slice/addressSlice";

const Address = () => {
  const [form, setForm] = useState({
    address: "",
    city: "",
    pincode: "",
    phone: "",
    notes: "",
  });

  const selectedId = useSelector((state) => state.selectedAddress.selectedId);
  const [activeTab, setActiveTab] = useState("orders");
  const [change, setChange] = useState(true);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let { user } = useSelector((state) => state.auth);
  let { addressList, isLoading } = useSelector((state) => state.address);
  console.log(addressList);
  let userId = user.user.id;
  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // console.log(form);

  // Api Call
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAddress({ userId, form })).then((res) => {
      setForm({
        address: "",
        city: "",
        pincode: "",
        phone: "",
        notes: "",
      });
      dispatch(featchAddress(userId)).then((res) => console.log(res));
    });
  };

  useEffect(() => {
    dispatch(featchAddress(userId)).then((res) => console.log(res));
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // CHANGE THE ICON

  const changeHandle = () => {
    if (change === false) {
      setChange(true);
    }
  };
  const changeHandle2 = () => {
    if (change === true) {
      setChange(false);
    }
  };

  const handleDelete = (userId, productId) => {
    console.log(userId, productId);
    dispatch(deleteAddress({ productId, userId })).then(() => {
      dispatch(featchAddress(userId));
    });
  };

  const handleEdit = (addressId, userId) => {
    navigate(`listing/${addressId}/${userId}/address`);
  };

  return (
    <>
      <div className="min-h-screen bg-white px-4 sm:px-8 lg:px-16 py-8 relative">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => {
              setActiveTab("orders");
              changeHandle();
            }}
            className={`pb-2 text-sm transition border-b-2 ${
              activeTab === "orders"
                ? "font-semibold text-gray-900 border-gray-900"
                : "text-gray-400 border-transparent hover:text-gray-700"
            }`}
          >
            Orders
          </button>

          <button
            onClick={() => {
              setActiveTab("address");
              changeHandle2();
            }}
            className={`pb-2 text-sm transition border-b-2 ${
              activeTab === "address"
                ? "font-semibold text-gray-900 border-gray-900"
                : "text-gray-400 border-transparent hover:text-gray-700"
            }`}
          >
            Address
          </button>
        </div>

        {/* Saved Addresses + Form */}
        {change ? (
          <Order />
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {addressList.map((addr, ind) => (
                <div
                  key={ind}
                  className="border border-gray-200 rounded-lg p-1 flex flex-col gap-1  "
                >
                  <div className="scale-75 sm:scale-90 lg:scale-110">
                    <Switch
                      checked={selectedId === addr._id}
                      onChange={() =>
                        dispatch(
                          setSelectedId(
                            selectedId === addr._id ? null : addr._id
                          )
                        )
                      }
                      width={50}
                      height={25}
                      handleDiameter={22}
                      onColor="#10b981"
                      offColor="#d1d5db"
                    />
                  </div>
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">Address:</span> {addr.address}
                  </p>
                  <p className="text-sm text-gray-700 mb-0">
                    <span className="font-medium">City:</span> {addr.city}
                  </p>
                  <p className="text-sm text-gray-700 mb-0">
                    <span className="font-medium">Pincode:</span> {addr.pincode}
                  </p>
                  <p className="text-sm text-gray-700 mb-0">
                    <span className="font-medium">Phone:</span> {addr.phone}
                  </p>
                  <p className="text-sm text-gray-700 mb-0">
                    <span className="font-medium">Notes:</span> {addr.note}
                  </p>

                  {/* Buttons */}
                  <div className="flex items-center justify-between mt-2">
                    <button
                      onClick={() => handleEdit(addr._id, addr.userId)}
                      className="px-3 py-1 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 active:scale-95 transition-all duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(addr.userId, addr._id)}
                      className="px-3 py-1 bg-gray-900 text-white text-sm font-semibold border rounded-xl hover:bg-red-600 active:scale-95 transition-all duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="max-w-full">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {/* {editId !== null ? "Edit Address" : "Add New Address"} */}
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-gray-400 transition"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-gray-400 transition"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="Enter your pincode"
                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-gray-400 transition"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-gray-400 transition"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <input
                    type="text"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Any notes (optional)"
                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-gray-400 transition"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-gray-900 text-white text-sm font-semibold rounded-md hover:bg-gray-700 active:scale-95 transition-all duration-200"
                >
                  {/* {editId !== null ? "Update Address" : "Add Address"} */}
                  Add Address
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Address;
