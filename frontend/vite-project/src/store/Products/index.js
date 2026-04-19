import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// all Product list

export const featchAllProduct = createAsyncThunk(
  "product/getproduct",
  async (_, { rejectWithValue }) => {
    try {
      let { data } = await axios.get(
        "https://twoe-commerce-website-mearn-stack.onrender.com/api/admin/product"
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// featchSingleProduct

export const featchSingleProduct = createAsyncThunk(
  "product/single",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `https://twoe-commerce-website-mearn-stack.onrender.com/api/admin/product/${id}/single`
      );
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// update product

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://twoe-commerce-website-mearn-stack.onrender.com/api/admin/product/${id}`,
        data
      );
      console.log(response);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// delete Product

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      let { data } = await axios.delete(
        `https://twoe-commerce-website-mearn-stack.onrender.com/api/admin/product/${id}/delete`
      );
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  isLoding: false,
  productList: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(featchAllProduct.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(featchAllProduct.fulfilled, (state, action) => {
        (state.isLoding = false), (state.productList = action.payload.data);
      })
      .addCase(featchAllProduct.rejected, (state) => {
        state.isLoding = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.productList = state.productList.filter(
          (val) => val._id !== deletedId
        );
      });
  },
});

export default productSlice.reducer;
