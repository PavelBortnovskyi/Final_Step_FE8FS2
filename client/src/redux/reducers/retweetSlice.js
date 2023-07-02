import { createSlice } from '@reduxjs/toolkit';
import { addRetweet } from '../thunk/tweets/addRetweet.js';
import { deleteTweet } from '../thunk/tweets/deleteTweet.js';

const initialState = {
  retweetData: [],
  isLoading: false,
  error: null,
};

export const retweetSlice = createSlice({
  name: 'retweet',
  initialState,

  extraReducers: (builder) => {
    // create_replay
    builder.addCase(addRetweet.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(addRetweet.fulfilled, (state, action) => {
      state.retweetData = [action.payload, ...state.retweetData];
      // state.retweetData = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    builder.addCase(addRetweet.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteTweet.fulfilled, (state, action) => {
      // state.userBookmarks = state.userBookmarks.filter((bookmark) => bookmark.id !== action.payload.id);
      const deletedTweetID = action.payload;
      state.retweetData = state.retweetData.filter(
        (tweet) => tweet.id === deletedTweetID
      );
      state.isLoading = false;
      state.error = null;
    })
  },
});

export default retweetSlice.reducer;