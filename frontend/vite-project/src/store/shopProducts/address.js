import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addAddress = createAsyncThunk(
  "product/newaddress",
  async ({ userId, form }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `https://twoe-commerce-website-mearn-stack.onrender.com/api/shop/product/address/${userId}/new`,
        form
      );
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const featchAddress = createAsyncThunk(
  "product/featchaddress",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://twoe-commerce-website-mearn-stack.onrender.com/api/shop/product/address/${userId}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete",
  async ({ productId, userId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `https://twoe-commerce-website-mearn-stack.onrender.com/api/shop/product/address/${userId}/${productId}`
      );
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const featchSingleAddress = createAsyncThunk(
  "address/single",
  async (addressId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://twoe-commerce-website-mearn-stack.onrender.com/api/shop/product/address/${addressId}/edit`
      );
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/update",
  async ({ addressId, userId, form }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `https://twoe-commerce-website-mearn-stack.onrender.com/api/shop/product/address/${addressId}/${userId}/update`,
        form
      );
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  isLoading: false,
  addressList: [],
  singleAddressList: null,
};

const addressSlice = createSlice({
  name: "addressSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(featchAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(featchAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(featchAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(featchSingleAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(featchSingleAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleAddressList = action.payload.data;
      })
      .addCase(featchSingleAddress.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default addressSlice.reducer;
