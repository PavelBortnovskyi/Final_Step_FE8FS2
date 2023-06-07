import { createSlice } from '@reduxjs/toolkit';

import { getTweetById } from '../thunk/getTweetById.js';

const initialState = {
  singleTweet: {},
  isLoading: false,
  error: '',
};

export const tweetByIdSlice = createSlice({
  name: 'singleTweet',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getTweetById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTweetById.fulfilled, (state, action) => {
        state.tweet = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getTweetById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default tweetByIdSlice.reducer;
