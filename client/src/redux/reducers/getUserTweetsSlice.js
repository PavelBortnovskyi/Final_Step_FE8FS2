import { createSlice } from '@reduxjs/toolkit';

import { getUserTweets } from '../thunk/getUserTweets.js';

const initialState = {
  tweetsById: [],
  isLoading: false,
  error: '',
};

export const getUserTweetsSlice = createSlice({
  name: 'userTweetsSlice',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getUserTweets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserTweets.fulfilled, (state, action) => {
        state.tweetsById = action.payload.tweet;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUserTweets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default getUserTweetsSlice.reducer;
