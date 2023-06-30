import { createSlice } from '@reduxjs/toolkit';

import { getAllTweetsThunk } from '../thunk/tweets/getAllTweetsThunk.js';
import { likePost } from '../thunk/tweets/likeTweet.js';
import { createTweet } from '../thunk/tweets/createTweet.js';
import { addBookmark } from '../thunk/thunkBookmarks/addBookmark.js';
import { addQuote } from '../thunk/tweets/addQuote.js';
import { getAllTweetsThunkNoAuth } from '../thunk/tweets/getAllTweetsThunkNoAuth.js';
import { addRetweet } from '../thunk/tweets/addRetweet.js';
import { deleteBookmark } from '../thunk/thunkBookmarks/deleteBookmark.js';
import { deleteTweet } from '../thunk/tweets/deleteTweet.js';

const initialState = {
  allTweets: [],
  isLoading: false,
  error: '',
};

const getAllTweetsSlice = createSlice({
  name: 'allTweets',
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(getAllTweetsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })

      .addCase(getAllTweetsThunk.fulfilled, (state, action) => {
        const newTweets = action.payload.filter(
          (newTweet) =>
            !state.allTweets.some((tweet) => tweet.id === newTweet.id)
        );

        state.allTweets = [...state.allTweets, ...newTweets];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAllTweetsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addRetweet.fulfilled, (state, action) => {
        const retweetTweet = action.payload;
        state.allTweets = state.allTweets.map((tweet) =>
          tweet.id === retweetTweet.id ? retweetTweet : tweet
        );
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const likedTweet = action.payload;
        state.allTweets = state.allTweets.map((tweet) =>
          tweet.id === likedTweet.id ? likedTweet : tweet
        );
      })
      .addCase(addQuote.fulfilled, (state, action) => {
        const quoteTweet = action.payload;
        state.allTweets = state.allTweets.map((tweet) =>
          tweet.id === quoteTweet.id ? quoteTweet : tweet
        );
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        const bookmarkTweet = action.payload;
        state.allTweets = state.allTweets.map((tweet) =>
          tweet.id === bookmarkTweet.id ? bookmarkTweet : tweet
        );
      })
      .addCase(createTweet.fulfilled, (state, action) => {
        const newTweet = action.payload;
        state.allTweets = [newTweet, ...state.allTweets];
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        const bookmarkTweet = action.payload;
        state.allTweets = state.allTweets.map((tweet) =>
          tweet.id === bookmarkTweet.id ? bookmarkTweet : tweet
        );
      })
      .addCase(deleteTweet.fulfilled, (state, action) => {
        const deleteRetweet = action.payload.parentTweet;
        state.allTweets = state.allTweets?.map((retweet) =>
        retweet.id === deleteRetweet.id ? deleteRetweet : retweet
        );
      })
  },
});

export default getAllTweetsSlice.reducer;
