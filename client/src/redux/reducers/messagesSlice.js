import { createSlice } from '@reduxjs/toolkit';

import { findUser } from '../thunk/findUser.js';

const initialState = {
  findUser: null,
  isLoading: false,
  error: '',
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,

  extraReducers: (builder) => {
    // findUser
    builder.addCase(findUser.pending, (state, action) => {
      state.findUser = null;
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(findUser.fulfilled, (state, action) => {
      state.findUser = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(findUser.rejected, (state, action) => {
      state.error = action.payload?.info;
      state.isLoading = false;
    });
  },
});

export default messagesSlice.reducer;
