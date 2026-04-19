import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "/autho/register",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://twoe-commerce-website-mearn-stack-backend.onrender.com/api/auth/register",
        formData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// login route backend

export const loginUser = createAsyncThunk(
  "/autho/login",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://twoe-commerce-website-mearn-stack-backend.onrender.com/api/auth/login",
        formData,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// check Autho

export const check_Autho = createAsyncThunk(
  "auth/checkAuth", // ✅ proper action type
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://twoe-commerce-website-mearn-stack-backend.onrender.com/api/auth/check-auth",
        {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-store,no-cache,must-revalidate,proxy-revalidate",
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// logout

export const logOut = createAsyncThunk(
  "admin/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://twoe-commerce-website-mearn-stack-backend.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      );

      console.log(data);

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//

const initialState = {
  isAuthenticated: false,
  isLoding: true, // 🔥 start true
  user: null,
};

const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoding = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoding = false;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoding = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoding = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // 🔥 CHECK AUTH (MOST IMPORTANT)
      .addCase(check_Autho.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(check_Autho.fulfilled, (state, action) => {
        state.isLoding = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(check_Autho.rejected, (state) => {
        state.isLoding = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logOut.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoding = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logOut.rejected, (state) => {
        state.isLoding = false;
      });
  },
});

export const { setUser } = authorSlice.actions;

export default authorSlice.reducer;
