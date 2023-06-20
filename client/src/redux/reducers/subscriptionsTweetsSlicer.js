import { createSlice } from '@reduxjs/toolkit';

import { getSubscriptionsTweets } from '../thunk/tweets/getSubscriptionsTweets.js';
import { likePost } from '../thunk/tweets/likeTweet.js';

const initialState = {
  subscriptionsTweets: [],
  isLoading: false,
  error: '',
};

export const getUserTweetsSlice = createSlice({
  name: 'subscriptionsTweets',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getSubscriptionsTweets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSubscriptionsTweets.fulfilled, (state, action) => {
        state.subscriptionsTweets = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getSubscriptionsTweets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const likedTweet = action.payload;
        state.subscriptionsTweets = state.subscriptionsTweets.map((tweet) =>
          tweet.id === likedTweet.id ? likedTweet : tweet
        );
      });
  },
});

export default getUserTweetsSlice.reducer;
