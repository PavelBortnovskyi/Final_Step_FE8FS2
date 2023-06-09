import { createSlice } from '@reduxjs/toolkit';

import { getCountLikes } from '../thunk/getCountLikes.js';

const initialState = {
  quantityLikes: null,
  isLoading: false,
  error: '',
};

export const quantityLikes = createSlice({
  name: 'quantityLike',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getTweetById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTweetById.fulfilled, (state, action) => {
        state.quantityLikes = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getTweetById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default quantityLikes.reducer;
