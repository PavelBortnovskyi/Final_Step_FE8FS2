import { createSlice } from '@reduxjs/toolkit';

import { getTweetReply } from '../thunk/tweets/getTweetReply.js';
import { createTweetReply } from '../thunk/tweets/replyTweet.js';
import { likePost } from '../thunk/tweets/likeTweet.js';
import { addBookmark } from '../thunk/thunkBookmarks/addBookmark.js';
import { addQuote } from '../thunk/tweets/addQuote.js';
import { addRetweet } from '../thunk/tweets/addRetweet.js';
import { deleteBookmark } from '../thunk/thunkBookmarks/deleteBookmark.js';

const initialState = {
  tweetReplies: [],
  isLoading: false,
  error: '',
};

export const tweetRepliesSlice = createSlice({
  name: 'tweetReplies',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getTweetReply.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTweetReply.fulfilled, (state, action) => {
        state.tweetReplies = action.payload.content;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getTweetReply.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createTweetReply.fulfilled, (state, action) => {
        state.tweetReplies = [action.payload.data, ...state.tweetReplies];
        state.isLoading = false;
      })
      .addCase(addRetweet.fulfilled, (state, action) => {
        const retweetTweet = action.payload;
        state.tweetReplies = state.tweetReplies.map((tweet) =>
          tweet.id === retweetTweet.id ? retweetTweet : tweet
        );
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const likedTweet = action.payload;
        state.tweetReplies = state.tweetReplies.map((tweet) =>
          tweet.id === likedTweet.id ? likedTweet : tweet
        );
      })
      .addCase(addQuote.fulfilled, (state, action) => {
        const quoteTweet = action.payload;
        state.tweetReplies = state.tweetReplies.map((tweet) =>
          tweet.id === quoteTweet.id ? quoteTweet : tweet
        );
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        const bookmarkTweet = action.payload;
        state.tweetReplies = state.tweetReplies.map((tweet) =>
          tweet.id === bookmarkTweet.id ? bookmarkTweet : tweet
        );
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        const bookmarkTweet = action.payload;
        state.tweetReplies = state.tweetReplies.map((tweet) =>
          tweet.id === bookmarkTweet.id ? bookmarkTweet : tweet
        );
      });
  },
});
export default tweetRepliesSlice.reducer;
