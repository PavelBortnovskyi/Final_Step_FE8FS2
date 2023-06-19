import { createSlice } from '@reduxjs/toolkit';

import { getTweetsFollowing } from '../thunk/tweets/getFollowingTweets.js';

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
      .addCase(getTweetsFollowing.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTweetsFollowing.fulfilled, (state, action) => {
        state.tweets = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getTweetsFollowing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default tweetSlice.reducer;
