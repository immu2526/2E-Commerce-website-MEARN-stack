import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    selectedId: null,
  },
  reducers: {
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
  },
});

export const { setSelectedId } = addressSlice.actions;
export default addressSlice.reducer;
