import { createSlice } from "@reduxjs/toolkit";

import { getUserBiId } from "../thunk/getUserBiId.js";

const initialState = {
  userId: "",
  isLoading: false,
  error: "",
};

export const userBiIdSlice = createSlice({
  name: "userId",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getUserBiId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserBiId.fulfilled, (state, action) => {
        state.userId = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUserBiId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default userBiIdSlice.reducer;
