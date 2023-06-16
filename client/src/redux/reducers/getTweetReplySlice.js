import { createSlice } from '@reduxjs/toolkit';

import { getTweetReply } from '../thunk/getTweetReply.js';

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
        state.tweetReplies = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getTweetReply.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default tweetRepliesSlice.reducer;
