import { createSlice } from "@reduxjs/toolkit";

import { getFollowings } from "../thunk/getFollowings.js";

const initialState = {
  followings: [],
  isLoading: false,
  error: "",
};

export const followingsSlice = createSlice({
  name: "followings",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getFollowings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFollowings.fulfilled, (state, action) => {
        state.followings = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getFollowings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default followingsSlice.reducer;
