import { createSlice } from '@reduxjs/toolkit';
import { addRetweet } from '../thunk/tweets/addRetweet.js';

const initialState = {
  retweetData: [],
  isLoading: false,
  error: null,
};

export const retweetSlice = createSlice({
  name: 'tweet',
  initialState,

  extraReducers: (builder) => {
    // create_replay
    builder.addCase(addRetweet.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(addRetweet.fulfilled, (state, action) => {
      // state.retweetData = [action.payload, ...state.retweetData];
      state.retweetData = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    builder.addCase(addRetweet.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default retweetSlice.reducer;