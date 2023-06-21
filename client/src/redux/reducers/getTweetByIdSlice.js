import { createSlice } from '@reduxjs/toolkit';

import { getTweetByIdThunk } from '../thunk/tweets/getTweetByIdThunk.js';
import { likePost } from '../thunk/tweets/likeTweet.js';

const initialState = {
  singleTweet: [],
  isLoading: false,
  error: '',
};

export const tweetByIdSlice = createSlice({
  name: 'singleTweet',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getTweetByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTweetByIdThunk.fulfilled, (state, action) => {
        state.singleTweet = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getTweetByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const likedTweet = action.payload;
        state.singleTweet = likedTweet;
      });
  },
});
export default tweetByIdSlice.reducer;
