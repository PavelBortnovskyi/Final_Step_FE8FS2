import { createSlice } from '@reduxjs/toolkit';
import { findUserRightSection } from '../thunk/findUserRightSection.js';

const initialState = {
  searchUser: null,
  isLoading: false,
  error: '',
};

export const findUserRightSectionSlice = createSlice({
  name: 'searchUser',
  initialState,

  extraReducers: (builder) => {
    // findUser
    builder.addCase(findUserRightSection.pending, (state, action) => {
      state.searchUser = null;
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(findUserRightSection.fulfilled, (state, action) => {
      state.searchUser = action.payload;
      state.isLoading = false;
    });
    builder.addCase(findUserRightSection.rejected, (state, action) => {
      state.error = action.payload?.info;
      state.isLoading = false;
    });
  },
});

export default findUserRightSectionSlice.reducer;