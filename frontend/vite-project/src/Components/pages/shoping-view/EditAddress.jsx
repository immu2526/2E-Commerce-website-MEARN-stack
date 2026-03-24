import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  featchSingleAddress,
  updateAddress,
} from "../../../store/shopProducts/address";

const EditAddress = () => {
  const { addressId, userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    address: "",
    city: "",
    pincode: "",
    phone: "",
    note: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //   Update call API

  const handleSubmit = () => {
    dispatch(updateAddress({ addressId, userId, form })).then((res) => {
      navigate(-1);
    });
  };

  useEffect(() => {
    dispatch(featchSingleAddress(addressId)).then((res) => {
      setForm(res.payload.data);
    });
  }, [dispatch, addressId]);

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full border border-gray-200"
        >
          ←
        </button>
        <h2 className="text-lg font-medium">Edit Address</h2>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col gap-4">
        {/* Address */}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="123 Main Street, Near Park"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400"
          />
        </div>

        {/* City + Pincode */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Delhi"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="110001"
              maxLength={6}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Phone</label>
          <div className="flex gap-2">
            <span className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500">
              +91
            </span>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="9876543210"
              maxLength={10}
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">
            Notes <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="e.g. Ring doorbell twice, leave at gate..."
            rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400 resize-none"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="py-2.5 text-sm border border-gray-200 rounded-lg text-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="py-2.5 text-sm bg-gray-900 text-white rounded-lg font-medium"
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default EditAddress;
