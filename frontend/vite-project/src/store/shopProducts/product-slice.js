import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { product } from "../../../../../backend/controllers/admin/product";

export const allProduct = createAsyncThunk(
  "shopproduct/product",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://twoe-commerce-website-mearn-stack.onrender.com/api/shop/product"
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const individualProduct = createAsyncThunk(
  "product/ind",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://twoe-commerce-website-mearn-stack.onrender.com/api/shop/product/${id}/individual`
      );

      // console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  isLoading: false,
  productList: [],
  productList2: null,
};

const shopingProductSlice = createSlice({
  name: "shopingProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allProduct.fulfilled, (state, action) => {
        (state.isLoading = false), (state.productList = action.payload.data);
      })
      .addCase(allProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(individualProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(individualProduct.fulfilled, (state, action) => {
        (state.isLoading = false), (state.productList2 = action.payload.data);
      })
      .addCase(individualProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList2 = null;
      });
  },
});

export default shopingProductSlice.reducer;
