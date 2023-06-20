import { createSlice } from '@reduxjs/toolkit';
import { createTweet } from '../thunk/tweets/createTweet.js';

const initialState = {
  text: '',
  files: [],
  isLoading: false,
  error: null,
};

export const tweetSlice = createSlice({
  name: 'tweet',
  initialState,

  extraReducers: (builder) => {
    // create_tweet
    builder.addCase(createTweet.pending, (state, action) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(createTweet.fulfilled, (state, action) => {
      state.text = action.payload.text;
      state.files = action.payload.files;
      state.isLoading = false;
    });
    builder.addCase(createTweet.rejected, (state, action) => {
      state.error = action.payload;
      state.error = action.payload?.info;
      state.isLoading = false;
    });
  },
});

export default tweetSlice.reducer;
