import { createSlice } from '@reduxjs/toolkit';

import { getUserTweetsThunk } from '../thunk/tweets/getUserTweets.js';
import { likePost } from '../thunk/tweets/likeTweet.js';

const initialState = {
  userTweets: [],
  isLoading: false,
  error: '',
};

export const getUserTweetsSlice = createSlice({
  name: 'userTweets',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getUserTweetsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserTweetsThunk.fulfilled, (state, action) => {
        state.userTweets = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUserTweetsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const likedTweet = action.payload;
        state.userTweets = state.userTweets.map((tweet) =>
          tweet.id === likedTweet.id ? likedTweet : tweet
        );
      });
  },
});

export default getUserTweetsSlice.reducer;
