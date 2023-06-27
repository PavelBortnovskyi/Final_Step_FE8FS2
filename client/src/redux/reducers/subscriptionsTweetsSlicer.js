import { createSlice } from '@reduxjs/toolkit';

import { getSubscriptionsTweets } from '../thunk/tweets/getSubscriptionsTweets.js';
import { likePost } from '../thunk/tweets/likeTweet.js';
import { createTweet } from '../thunk/tweets/createTweet.js';
import { addBookmark } from '../thunk/thunkBookmarks/addBookmark.js';
import { addQuote } from '../thunk/tweets/addQuote.js';
import { addRetweet } from '../thunk/tweets/addRetweet.js';
import { deleteBookmark } from '../thunk/thunkBookmarks/deleteBookmark.js';
import { deleteTweet } from '../thunk/tweets/deleteTweet.js';

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
      })
      .addCase(addRetweet.fulfilled, (state, action) => {
        const retweetTweet = action.payload.parentTweet;
        state.subscriptionsTweets = state.subscriptionsTweets.map((tweet) =>
          tweet.id === retweetTweet.id ? retweetTweet : tweet
        );
      })
      .addCase(deleteTweet.fulfilled, (state, action) => {
        const deleteTweet = action.payload;
        state.subscriptionsTweets = state.subscriptionsTweets.filter(
          (tweet) => tweet.id !== deleteTweet.id
        );
      })

      .addCase(addQuote.fulfilled, (state, action) => {
        const quoteTweet = action.payload;
        state.subscriptionsTweets = state.subscriptionsTweets.map((tweet) =>
          tweet.id === quoteTweet.id ? quoteTweet : tweet
        );
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        const bookmarkTweet = action.payload;
        state.subscriptionsTweets = state.subscriptionsTweets.map((tweet) =>
          tweet.id === bookmarkTweet.id ? bookmarkTweet : tweet
        );
      })
      .addCase(createTweet.fulfilled, (state, action) => {
        const newTweet = action.payload;
        state.subscriptionsTweets = [newTweet, ...state.subscriptionsTweets];
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        const bookmarkTweet = action.payload;
        state.subscriptionsTweets = state.subscriptionsTweets.map((tweet) =>
          tweet.id === bookmarkTweet.id ? bookmarkTweet : tweet
        );
      });
  },
});

export default getUserTweetsSlice.reducer;
