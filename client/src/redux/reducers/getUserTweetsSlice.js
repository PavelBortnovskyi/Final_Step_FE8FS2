import { createSlice } from '@reduxjs/toolkit';
import { addBookmark } from '../thunk/thunkBookmarks/addBookmark.js';
import { getUserTweetsThunk } from '../thunk/getUserTweets.js';
import { deleteBookmark } from '../thunk/thunkBookmarks/deleteBookmark.js';

const initialState = {
  userTweets: [],
  isLoading: false,
  error: '',
};

export const getUserTweetsSlice = createSlice({
  name: 'userTweets',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getUserTweetsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserTweetsThunk.fulfilled, (state, action) => {
        state.userTweets = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUserTweetsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});
export default getUserTweetsSlice.reducer;
