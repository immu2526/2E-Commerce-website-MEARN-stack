import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const sendReview = createAsyncThunk(
  "product/review",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const review = await axios.post(
        `https://twoe-commerce-website-mearn-stack.onrender.com/api/shop/product/review/${id}/review`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      return review.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const allReview = createAsyncThunk(
  "product/allreivew",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://twoe-commerce-website-mearn-stack.onrender.com/api/shop/product/review/${id}`
      );
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "product/deleteReview",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `https://twoe-commerce-website-mearn-stack.onrender.com/api/shop/product/review/${id}`,
        {
          withCredentials: true,
        }
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const initialState = {
  isLoading: false,
  reviewList: [],
};

const reviewSlice = createSlice({
  name: "shopingProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allReview.fulfilled, (state, action) => {
        (state.isLoading = false), (state.reviewList = action.payload.data);
      })
      .addCase(allReview.rejected, (state) => {
        state.isLoading = false;
        state.reviewList = [];
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviewList = state.reviewList.filter(
          (review) => review._id !== action.payload
        );
      });
  },
});

export default reviewSlice.reducer;
