// userRepliseSlice
import { createSlice } from '@reduxjs/toolkit';
import { getUserReplise } from '../thunk/getUserReplise.js';
import { addRetweet } from '../thunk/tweets/addRetweet.js';
import { likePost } from '../thunk/tweets/likeTweet.js';
import { addQuote } from '../thunk/tweets/addQuote.js';
import { addBookmark } from '../thunk/thunkBookmarks/addBookmark.js';
import { deleteBookmark } from '../thunk/thunkBookmarks/deleteBookmark.js';

const initialState = {
  userReplise: [],
  isLoading: false,
  error: '',
};

export const userRepliseSlice = createSlice({
  name: 'userReplise',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getUserReplise.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserReplise.fulfilled, (state, action) => {
        const newTweets = action.payload.filter(
          (newTweet) =>
            !state.userReplise.some((tweet) => tweet.id === newTweet.id)
        );

        state.userReplise = [...state.userReplise, ...newTweets];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUserReplise.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addRetweet.fulfilled, (state, action) => {
        const retweetTweet = action.payload;
        state.userReplise = state.userReplise.map((tweet) =>
          tweet.id === retweetTweet.id ? retweetTweet : tweet
        );
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const likedTweet = action.payload;
        state.userReplise = state.userReplise.map((tweet) =>
          tweet.id === likedTweet.id ? likedTweet : tweet
        );
      })
      .addCase(addQuote.fulfilled, (state, action) => {
        const quoteTweet = action.payload;
        state.userReplise = state.userReplise.map((tweet) =>
          tweet.id === quoteTweet.id ? quoteTweet : tweet
        );
      });
    // .addCase(addBookmark.fulfilled, (state, action) => {
    //   const bookmarkTweet = action.payload;
    //   state.userReplise = state.userReplise.map((tweet) =>
    //     tweet.parentTweet.id === bookmarkTweet.id ? bookmarkTweet : tweet
    //   );
    // })
    // .addCase(deleteBookmark.fulfilled, (state, action) => {
    //   const bookmarkTweet = action.payload;
    //   state.userReplise = state.userReplise.parentTweet.map((tweet) =>
    //     tweet.parentTweet.id === bookmarkTweet.id ? bookmarkTweet : tweet
    //   );
    // });
  },
});
export default userRepliseSlice.reducer;
