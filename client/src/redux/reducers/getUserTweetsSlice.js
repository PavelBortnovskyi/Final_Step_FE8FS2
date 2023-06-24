import { createSlice } from '@reduxjs/toolkit';

import { getUserTweetsThunk } from '../thunk/tweets/getUserTweets.js';
import { likePost } from '../thunk/tweets/likeTweet.js';
import { addBookmark } from '../thunk/thunkBookmarks/addBookmark.js';
import { addQuote } from '../thunk/tweets/addQuote.js';
import { addRetweet } from '../thunk/tweets/addRetweet.js';
import { createTweetReply } from '../thunk/tweets/replyTweet.js';
import { deleteBookmark } from '../thunk/thunkBookmarks/deleteBookmark.js';

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
      })
      .addCase(createTweetReply.fulfilled, (state, action) => {
        state.userTweets = [action.payload.data, ...state.userTweets];
        state.isLoading = false;
      })
      .addCase(addRetweet.fulfilled, (state, action) => {
        const retweetTweet = action.payload.parentTweet;
        state.userTweets = state.userTweets.map((tweet) =>
          tweet.id === retweetTweet.id ? retweetTweet : tweet
        );
      })
      .addCase(addQuote.fulfilled, (state, action) => {
        const quoteTweet = action.payload;
        state.userTweets = state.userTweets.map((tweet) =>
          tweet.id === quoteTweet.id ? quoteTweet : tweet
        );
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        const bookmarkTweet = action.payload;
        state.userTweets = state.userTweets.map((tweet) =>
          tweet.id === bookmarkTweet.id ? bookmarkTweet : tweet
        );
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        const bookmarkTweet = action.payload;
        state.userTweets = state.userTweets.map((tweet) =>
          tweet.id === bookmarkTweet.id ? bookmarkTweet : tweet
        );
      });
  },
});

export default getUserTweetsSlice.reducer;
