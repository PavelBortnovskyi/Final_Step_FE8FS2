import { createSlice } from '@reduxjs/toolkit';
import { getBookmarks } from '../thunk/thunkBookmarks/getBookmarks.js';
import { addBookmark } from '../thunk/thunkBookmarks/addBookmark.js';
import { deleteBookmark } from '../thunk/thunkBookmarks/deleteBookmark.js';
import { addRetweet } from '../thunk/tweets/addRetweet.js';
import { likePost } from '../thunk/tweets/likeTweet.js';
import { addQuote } from '../thunk/tweets/addQuote.js';
import { addReplyTweet } from '../thunk/tweets/addReplyTweet.js';

const initialState = {
  userBookmarks: [],
  isLoading: false,
  error: null,
};

export const bookmarksSlise = createSlice({
  name: 'userBookmarks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookmarks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.userBookmarks = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getBookmarks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // .addCase(addBookmark.fulfilled, (state, action) => {
      //   state.userBookmarks = [action.payload, ...state.userBookmarks];
      //   state.isLoading = false;
      // })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        const unBookmark = action.payload;
        state.userBookmarks = state.userBookmarks.filter(
          (bookmark) => bookmark.tweet.id !== unBookmark.id
        );
        state.isLoading = false;
        state.error = null;
      }) 
      .addCase(addRetweet.fulfilled, (state, action) => {
        const addRetweetBookmark = action.payload;
        state.userBookmarks = state.userBookmarks.map(tweet => 
          tweet.tweet.id === addRetweetBookmark.id ? {tweet : addRetweetBookmark} : tweet
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const toggleLike = action.payload;
        state.userBookmarks = state.userBookmarks.map(tweet => 
          tweet.tweet.id === toggleLike.id ? {tweet : toggleLike} : tweet
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addQuote.fulfilled, (state, action) => {
        const addQuoteBookmark = action.payload.data.parentTweet;
        state.userBookmarks = state.userBookmarks.map(tweet => 
          tweet.tweet.id === addQuoteBookmark.id ? {tweet : addQuoteBookmark} : tweet
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addReplyTweet.fulfilled, (state, action) => {
        const addReply = action.payload.data.parentTweet;
        state.userBookmarks = state.userBookmarks.map(tweet => 
          tweet.tweet.id === addReply.id ? {tweet : addReply} : tweet
        );
        state.isLoading = false;
        state.error = null;
      })
  },
});

export default bookmarksSlise.reducer;



