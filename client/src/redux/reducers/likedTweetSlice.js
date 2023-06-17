import { createSlice } from '@reduxjs/toolkit';

import { likePost } from '../thunk/likeTweet.js';

const initialState = {
  likedTweet: {},
  isLoading: false,
  error: '',
};

export const likedTweetSlice = createSlice({
  name: 'likedTweet',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(likePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.tweet = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default likedTweetSlice.reducer;
