import { createSlice } from '@reduxjs/toolkit';
import { createTweet } from '../thunk/tweets/createTweet.js';

const initialState = {
  tweetBody: '',
  attachmentImages: [],
  isLoading: false,
  error: null,
};

export const tweetSlice = createSlice({
  name: 'tweetCreate',
  initialState,

  extraReducers: (builder) => {
    // create_tweet
    builder.addCase(createTweet.pending, (state, action) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(createTweet.fulfilled, (state, action) => {
      state.tweetBody = action.payload.tweetBody;
      state.attachmentImages = action.payload.attachmentImages;
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
