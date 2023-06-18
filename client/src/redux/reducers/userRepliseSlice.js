// userRepliseSlice
import { createSlice } from '@reduxjs/toolkit';
import { getUserReplise } from '../thunk/getUserReplise.js';

const initialState = {
  userReplise: '',
  isLoading: false,
  error: '',
};

export const userRepliseSlice = createSlice({
  name: 'userReplise',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getUserReplise.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserReplise.fulfilled, (state, action) => {
        state.userReplise = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUserReplise.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default userRepliseSlice.reducer;
