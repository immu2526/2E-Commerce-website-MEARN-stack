import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const featchOrder = createAsyncThunk("featch/order", async (userId) => {
  const { data } = await axios.get(
    `https://twoe-commerce-website-mearn-stack-backend.onrender.com/api/shop/order/payment/${userId}/allorder`
  );
  return data;
});

export const featchOrderDetails = createAsyncThunk(
  "order/details",
  async (id) => {
    const { data } = await axios.get(
      `https://twoe-commerce-website-mearn-stack-backend.onrender.com/api/shop/order/payment/details/${id}`
    );

    console.log(data);

    return data;
  }
);

export const allOrder = createAsyncThunk("all/order", async () => {
  const { data } = await axios.get(
    "https://twoe-commerce-website-mearn-stack-backend.onrender.com/api/shop/order/payment"
  );

  console.log(data);

  return data;
});

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

const featchOrderSlice = createSlice({
  name: "featchOrder",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(featchOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(featchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(featchOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(featchOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(featchOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(featchOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(allOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(allOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      });
  },
});

export default featchOrderSlice.reducer;
