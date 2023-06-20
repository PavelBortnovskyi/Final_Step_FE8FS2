import { createSlice } from '@reduxjs/toolkit';
import { addReplay } from '../thunk/addReplay.js';

const initialState = {
  tweetBody: '',
  attachmentImages: [],
  isLoading: false,
  error: null,
};

export const quoteSlice = createSlice({
  name: 'tweet',
  initialState,

  extraReducers: (builder) => {
    // create_replay
    builder.addCase(addReplay.pending, (state, action) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(addReplay.fulfilled, (state, action) => {
      state.tweetBody = action.payload.tweetBody;
      state.attachmentImages = action.payload.attachmentImages;
      state.isLoading = false;
    });
    builder.addCase(addReplay.rejected, (state, action) => {
      state.error = action.payload;
      state.error = action.payload?.info;
      state.isLoading = false;
    });
  },
});

export default quoteSlice.reducer;