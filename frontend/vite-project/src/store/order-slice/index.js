import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createNewOrder = createAsyncThunk(
  "create/order",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://twoe-commerce-website-mearn-stack-backend.onrender.com/api/shop/order/payment/create",
        orderData
      );
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const captureOrder = createAsyncThunk(
  "capture/order",
  async ({ paymentId, payerId, orderId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://twoe-commerce-website-mearn-stack-backend.onrender.com/api/shop/order/payment/capture",
        { paymentId, payerId, orderId }
      );
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  approvalURL: null,
  isLoading: false,
  order: null,
};

const shopingOrderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.order = action.payload.orderId;
        sessionStorage.setItem(
          "OrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.order = null;
      });
  },
});

export default shopingOrderSlice.reducer;
