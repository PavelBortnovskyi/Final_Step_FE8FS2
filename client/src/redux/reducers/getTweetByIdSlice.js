import { createSlice } from '@reduxjs/toolkit';

import { getTweetByIdThunk } from '../thunk/tweets/getTweetByIdThunk.js';
import { likePost } from '../thunk/tweets/likeTweet.js';
import { createTweetReply } from '../thunk//tweets/replyTweet.js';
import { addRetweet } from '../thunk/tweets/addRetweet.js';
import { addBookmark } from '../thunk/thunkBookmarks/addBookmark.js';
import { deleteBookmark } from '../thunk/thunkBookmarks/deleteBookmark.js';
import { addQuote } from '../thunk/tweets/addQuote.js';
import { deleteTweet } from '../thunk/tweets/deleteTweet.js';

const initialState = {
  singleTweet: [],
  isLoading: false,
  error: '',
};

export const tweetByIdSlice = createSlice({
  name: 'singleTweet',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getTweetByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTweetByIdThunk.fulfilled, (state, action) => {
        state.singleTweet = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getTweetByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const likedTweet = action.payload;
        state.singleTweet = likedTweet;
      })
      .addCase(createTweetReply.fulfilled, (state, action) => {
        const createdReplyTweet = action.payload.data.parentTweet;
        state.singleTweet = createdReplyTweet;
      })
      .addCase(addRetweet.fulfilled, (state, action) => {
        const retweetedTweet = action.payload.parentTweet;
        state.singleTweet = retweetedTweet;
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        const bookmarkTweet = action.payload;
        state.singleTweet = bookmarkTweet;
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        const bookmarkDeletedTweet = action.payload;
        state.singleTweet = bookmarkDeletedTweet;
      })
      .addCase(addQuote.fulfilled, (state, action) => {
        const createdQuote = action.payload.data.parentTweet;
        state.singleTweet = createdQuote;
      })
      .addCase(deleteTweet.fulfilled, (state, action) => {
        const deleteRetweet = action.payload;
        state.singleTweet = deleteRetweet;
      })
  },
});
export default tweetByIdSlice.reducer;
