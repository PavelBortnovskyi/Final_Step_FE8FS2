import { createSlice } from '@reduxjs/toolkit';

import { getTweets } from '../thunk/getTweets.js';

const initialState = {
  tweets: [],
  isLoading: false,
  error: '',
};

export const tweetSlice = createSlice({
  name: 'tweets',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getTweets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTweets.fulfilled, (state, action) => {
        state.tweets = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getTweets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default tweetSlice.reducer;
