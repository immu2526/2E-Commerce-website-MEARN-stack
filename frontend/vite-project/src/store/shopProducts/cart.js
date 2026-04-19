import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addCart = createAsyncThunk(
  "product/review",
  async ({ quantity, productid }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://twoe-commerce-website-mearn-stack-backend.onrender.com/api/shop/product/cart/new",
        { quantity, productid },
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const allCart = createAsyncThunk(
  "product/review",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://twoe-commerce-website-mearn-stack-backend.onrender.com/api/shop/product/cart",
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// decrese Quantity

export const decreaseQuantity = createAsyncThunk(
  "product/update",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "https://twoe-commerce-website-mearn-stack-backend.onrender.com/api/shop/product/cart/update",
        { productId },
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "product/delete",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        "https://twoe-commerce-website-mearn-stack-backend.onrender.com/api/shop/product/cart/delete",
        {
          data: { productId },
          withCredentials: true,
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  isLoading: false,
  cartList: [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(allCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allCart.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cartList = action.payload.data);
      })
      .addCase(allCart.rejected, (state, action) => {
        state.isLoading = false;
        state.cartList = [];
      })
      .addCase(decreaseQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedItem = action.payload.data;
        const item = state.cartList[0].items.find(
          (i) => i.productId._id === updatedItem.productId
        );
        if (item) {
          item.quantity = updatedItem.quantity;
        }
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.cartList = [];
      })
      .addCase(deleteCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cartList = action.payload.data);
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isLoading = false;
        state.cartList = [];
      });
  },
});

export default cartSlice.reducer;
