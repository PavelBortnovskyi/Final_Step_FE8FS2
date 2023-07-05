import { createSlice } from '@reduxjs/toolkit';

import { createTweet } from '../thunk/tweets/createTweet.js';

const initialState = {
  createPost: null,
  isLoading: false,
  error: '',
};

export const createPost = createSlice({
  name: 'user',
  initialState,

  extraReducers: (builder) => {
    // getUser
    builder.addCase(createTweet.pending, (state, action) => {
      // state.user = null;
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(createTweet.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(createTweet.rejected, (state, action) => {
      state.error = action.payload?.info;
      state.isLoading = false;
    });
  },
});

export default createPost.reducer;
