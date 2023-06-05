import { createSlice } from "@reduxjs/toolkit";

import { getFollowers } from "../thunk/getFollowers.js";

const initialState = {
  followers: [],
  isLoading: false,
  error: "",
};

export const followersSlice = createSlice({
  name: "followers",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getFollowers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.followers = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default followersSlice.reducer;
