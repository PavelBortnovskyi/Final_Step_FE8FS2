import { createSlice } from '@reduxjs/toolkit';
import { addQuote } from '../thunk/tweets/addQuote.js';


const initialState = {
  // tweetBody: '',
  // attachmentImages: [],
  quoteTweet: [],
  isLoading: false,
  error: null,
};

export const quoteSlice = createSlice({
  name: 'tweet',
  initialState,

  extraReducers: (builder) => {
    // create_replay
    builder.addCase(addQuote.pending, (state, action) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(addQuote.fulfilled, (state, action) => {
      // state.tweetBody = action.payload.tweetBody;
      // state.attachmentImages = action.payload.attachmentImages;
      state.quoteTweet = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addQuote.rejected, (state, action) => {
      state.error = action.payload;
      state.error = action.payload?.info;
      state.isLoading = false;
    });
  },
});

export default quoteSlice.reducer;