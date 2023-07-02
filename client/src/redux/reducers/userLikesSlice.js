import { createSlice } from '@reduxjs/toolkit';
import { getUserLikes } from '../thunk/getUserLikes.js';
import { unLikePost } from '../thunk/tweets/unlike.js';
import { addQuote } from '../thunk/tweets/addQuote.js';
import { deleteBookmark } from '../thunk/thunkBookmarks/deleteBookmark.js';
import { addBookmark } from '../thunk/thunkBookmarks/addBookmark.js';
import { addRetweet } from '../thunk/tweets/addRetweet.js';
import { createTweetReply } from '../thunk/tweets/replyTweet.js';

const initialState = {
  userLikes: [],
  isLoading: false,
  error: '',
};

export const userLikesSlice = createSlice({
  name: 'userLikes',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getUserLikes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserLikes.fulfilled, (state, action) => {
        const newTweets = action.payload.filter(
          (newTweet) =>
            !state.userLikes.some((tweet) => tweet.id === newTweet.id)
        );
        state.userLikes = [...state.userLikes, ...newTweets];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUserLikes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(unLikePost.fulfilled, (state, action) => {
        const unLikedTweet = action.payload;
        state.userLikes = state.userLikes.filter(
          (post) => post.tweet.id !== unLikedTweet.id
        );
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        const bookmarkTweet = action.payload;
        state.userLikes = state.userLikes.map((tweet) =>
          tweet.tweet.id === bookmarkTweet.id ? { tweet: bookmarkTweet } : tweet
        );
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        const bookmarkTweet = action.payload;
        state.userLikes = state.userLikes.map((tweet) =>
          tweet.tweet.id === bookmarkTweet.id ? { tweet: bookmarkTweet } : tweet
        );
      })
      .addCase(addRetweet.fulfilled, (state, action) => {
        const retweetTweet = action.payload;
        state.userLikes = state.userLikes.map((tweet) =>
          tweet.tweet.id === retweetTweet.id ? { tweet: retweetTweet } : tweet
        );
      })
      .addCase(createTweetReply.fulfilled, (state, action) => {
        const commentedTweet = action.payload.data.parentTweet;
        state.userLikes = state.userLikes.map((tweet) =>
          tweet.tweet.id === commentedTweet.id
            ? { tweet: commentedTweet }
            : tweet
        );
        state.isLoading = false;
      })
      .addCase(addQuote.fulfilled, (state, action) => {
        const quotedTweet = action.payload.data.parentTweet;
        state.userLikes = state.userLikes.map((tweet) =>
          tweet.tweet.id === quotedTweet.id ? { tweet: quotedTweet } : tweet
        );
        state.isLoading = false;
      });
  },
});
export default userLikesSlice.reducer;
