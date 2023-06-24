import { createSlice } from '@reduxjs/toolkit';

import { getAllTweetsThunkNoAuth } from '../thunk/tweets/getAllTweetsThunkNoAuth.js';

const initialState = {
  tweetsNoAuth: [],
  isLoading: false,
  error: '',
};

export const getTweetsNoAuth = createSlice({
  name: 'userTweets',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getAllTweetsThunkNoAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllTweetsThunkNoAuth.fulfilled, (state, action) => {
        state.tweetsNoAuth = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAllTweetsThunkNoAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default getTweetsNoAuth.reducer;
