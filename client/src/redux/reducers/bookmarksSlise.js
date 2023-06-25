import { createSlice } from '@reduxjs/toolkit';
import { getBookmarks } from '../thunk/thunkBookmarks/getBookmarks.js';
import { addBookmark } from '../thunk/thunkBookmarks/addBookmark.js';
import { deleteBookmark } from '../thunk/thunkBookmarks/deleteBookmark.js';

const initialState = {
  userBookmarks: [],
  isLoading: false,
  error: null,
};

export const bookmarksSlise = createSlice({
  name: 'userBookmarks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookmarks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.userBookmarks = action.payload.content;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getBookmarks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.userBookmarks = [action.payload, ...state.userBookmarks];
        state.isLoading = false;
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        // state.userBookmarks = state.userBookmarks.filter((bookmark) => bookmark.id !== action.payload.id);
        const deletedBookmarkId = action.payload;
        state.userBookmarks = state.userBookmarks.filter(
          (bookmark) => bookmark.id !== deletedBookmarkId
        );
        state.isLoading = false;
        state.error = null;
      })
  },
});

export default bookmarksSlise.reducer;



