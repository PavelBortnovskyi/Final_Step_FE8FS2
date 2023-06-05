import { createSlice } from '@reduxjs/toolkit';
import { getBookmarks } from '../thunk/getBookmarks.js';

const initialState = {
  userTweets: [],
  isLoading: false,
  error: '',
};

export const getBookmarksSlise = () => createSlice({
  name: 'userBookmarks',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getBookmarks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.userBookmarks = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getBookmarks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

